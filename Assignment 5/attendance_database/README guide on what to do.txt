1) HSQL database

2) Download the .zip file that contains the class attendance database to your computer, and extract it.

3) Run the database server using the  server_hsql_attendance.bat or  server_hsql_attendance.sh file in a terminal.

4) Launch the GUI SQL tool from within a second terminal using the followng command:

java -jar hsqldb.jar

5) This is the URL of the attendance database:

jdbc:hsqldb:hsql://localhost/zumba


Example queries:

--------

select * from zumba_roster
--------
//Attendance summary report (short version).
SELECT section, fullname, ssuid, COUNT(ssuid) AS attended, COUNT(excused = true) AS excused, TO_CHAR ( max(timestamp), 'MM-DD' ) AS lastattended
FROM zumba_attendance, zumba_roster
WHERE zumba_roster.ssuid = zumba_attendance.ssuid
GROUP BY ssuid, section, fullname
ORDER BY section, fullname;
--------
//Attendance complete list report.
SELECT zumba_roster.fullname, zumba_roster.ssuid, zumba_attendance.excused, TO_CHAR ( zumba_attendance.timestamp, 'MM-DD' ) as date
FROM zumba_attendance, zumba_roster
WHERE zumba_roster.ssuid = zumba_attendance.ssuid
ORDER BY zumba_roster.fullname, date
--------
//Noshow report.
SELECT section, fullname, ssuid
FROM zumba_roster
WHERE ssuid NOT IN (SELECT ssuid FROM zumba_attendance)
ORDER BY section, fullname;