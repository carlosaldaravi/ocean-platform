# Ocean Platform

Platform to all ocean school to manage students, instructors and courses.

## Stack

- Database - PostgreSQL
- REST API - ControllerJS
- Frontend - VueJS

## User Roles:

- Admin
- Student
- Intructor
- General

## ENDPOINTS:

- User
  {**/api/users/:userId**, [GET]}
  {**/api/users**, [GET]}
  {**/api/users/:userId**, [PATCH]}
  {**/api/users/setRole/:userId/:roleId**, [POST]}
  {**/api/users/setTargets**, [POST]}
  {**/api/users/:userId**, [DELETE]}
- Student
  {**/api/students**, [GET]}
  {**/api/students**, [POST]}
  {**/api/students/targets**, [GET]}
  {**/api/students/courses**, [GET]}
- Instructor
  {**/api/instructors**, [GET]}
- Auth
  {**/api/auth/signup**, [POST]}
  {**/api/auth/signin**, [POST]}
- Role
  {**/api/roles/:roleId**, [GET]}
  {**/api/roles**, [GET]}
  {**/api/roles**, [POST]}
  {**/api/roles/:roleId**, [PATCH]}
  {**/api/roles/:roleId**, [DELETE]}
- Target
  {**/api/targets/:targetId**, [GET]}
  {**/api/targets**, [GET]}
  {**/api/targets**, [POST]}
  {**/api/targets/:targetId**, [PATCH]}
  {**/api/targets/:targetId**, [DELETE]}
- Calendar
  {**/api/calendar**, [GET]}
  {**/api/calendar**, [POST]}
  {**/api/calendar/:calendarId**, [PATCH]}
  {**/api/calendar/:calendarId**, [DELETE]}
- Sport
  {**/api/sports/:sportId**, [GET]}
  {**/api/sports**, [GET]}
  {**/api/sports**, [POST]}
  {**/api/sports/:sportId**, [PATCH]}
  {**/api/sports/:sportId**, [DELETE]}
- Level
  {**/api/levels/:levelId**, [GET]}
  {**/api/levels**, [GET]}
  {**/api/levels**, [POST]}
  {**/api/levels/:levelId**, [PATCH]}
  {**/api/levels/:levelId**, [DELETE]}
- Language
  {**/api/languages/:languageId**, [GET]}
  {**/api/languages**, [GET]}
  {**/api/languages**, [POST]}
  {**/api/languages/:languageId**, [PATCH]}
  {**/api/languages/:languageId**, [DELETE]}
- Course
  {**/api/course**, [POST]}
  {**/api/paid/:courseId/:studentId**, [PATCH]}
  {**/api/cashed/:courseId/:instructorId**, [PATCH]}

## Relations

- Courses [N:1] Levels
- Courses [N:1] Sports
- Courses [N:1] CourseType
- Courses [N:M] Calendar
- Courses [N:M] Users(Students)
- Courses [N:M] Users(Instructors)
- Users [N:M] Sports
- Users [1:1] Details
- Users [N:M] Targets
- Users [N:M] Languages
- Users [N:M] Calendar
- Users [N:M] Roles
- Calendar [N:1] Type
- Student_targets [N:1] Levels
- Student_targets [N:1] Users(validatedBy)
