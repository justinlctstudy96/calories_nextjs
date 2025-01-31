import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { isAdminRole } from "@/drizzle/queries/users-to-roles.query";
import { getAttendanceRecordById, updateAttendanceRecord } from "@/drizzle/queries/attendance-record.query";

export async function PUT(req: Request, {params}: any) {
    try {
        const recordId = params.recordId;
        const session = await auth();
        if (!session?.user.id) { return NextResponse.json({message: "Invalid session"}, {status: 409}) }
        if (!(await isAdminRole(session?.user.id))) { return NextResponse.json({message: "Unauthorized"}, {status: 401}) }
        const existingRecord = await getAttendanceRecordById(recordId);
        if (!existingRecord) { return NextResponse.json({message: "Record not found"}, {status: 404}) }
        const updateObj = await req.json();
        console.log("updateObj", JSON.stringify(updateObj));
        const newAttendanceRecord = await updateAttendanceRecord(recordId, updateObj);
        const updatedKeys = Object.keys(updateObj);
        return NextResponse.json(
            {attendanceRecord: newAttendanceRecord, message: `Updated ${updatedKeys} of attendance record. `},
            {status: 200}
        )
    } catch (e) {
        return NextResponse.json(
            {message: "Something went wrong"},
            {status: 500}
        )
    }    
}