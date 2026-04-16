CREATE TABLE "course" (
	"course_id" varchar(8) PRIMARY KEY NOT NULL,
	"course_name" varchar(100) NOT NULL,
	"credits" integer,
	"theoretical_credits" integer,
	"practical_credits" integer,
	"stage" integer,
	"optional_11" char(2) NOT NULL,
	"optional_28" char(2) NOT NULL,
	"compulsory_for_specific_11" varchar(100),
	"course_group" varchar(100)
);
--> statement-breakpoint
CREATE TABLE "field" (
	"field_id" char(2) PRIMARY KEY NOT NULL,
	"field_name" varchar(100) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "form_of_application" (
	"application_id" char(4) PRIMARY KEY NOT NULL,
	"application_name" varchar(100) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "grade" (
	"school_year" varchar(11) NOT NULL,
	"semester" char(3) NOT NULL,
	"course_id" varchar(8) NOT NULL,
	"student_id" char(8) NOT NULL,
	"final_score" numeric(5, 2),
	CONSTRAINT "grade_school_year_semester_course_id_student_id_pk" PRIMARY KEY("school_year","semester","course_id","student_id")
);
--> statement-breakpoint
CREATE TABLE "major" (
	"field_id" char(2) NOT NULL,
	"subfield_id" char(4) NOT NULL,
	"major_id" char(6) PRIMARY KEY NOT NULL,
	"major_name" varchar(100) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "stage" (
	"stage_num" integer PRIMARY KEY NOT NULL
);
--> statement-breakpoint
CREATE TABLE "student" (
	"student_id" char(8) PRIMARY KEY NOT NULL,
	"gender" varchar(3) NOT NULL,
	"academic_degree" varchar(10) NOT NULL,
	"field_id" char(2),
	"subfield_id" char(4),
	"major_id" char(6),
	"application_id" char(4),
	"highschool_name" varchar(200) NOT NULL,
	"honor_program" varchar(5),
	"school_year" varchar(11) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "student_performance" (
	"school_year" varchar(11) NOT NULL,
	"semester" char(3) NOT NULL,
	"student_id" char(8) NOT NULL,
	"field_id" char(2),
	"subfield_id" char(4),
	"major_id" char(6),
	"status" varchar(20) NOT NULL,
	CONSTRAINT "student_performance_school_year_semester_student_id_pk" PRIMARY KEY("school_year","semester","student_id")
);
--> statement-breakpoint
CREATE TABLE "subfield" (
	"field_id" char(2) NOT NULL,
	"subfield_id" char(4) PRIMARY KEY NOT NULL,
	"subfield_name" varchar(100) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "year" (
	"school_year" varchar(11) PRIMARY KEY NOT NULL
);
--> statement-breakpoint
ALTER TABLE "course" ADD CONSTRAINT "course_stage_stage_stage_num_fk" FOREIGN KEY ("stage") REFERENCES "public"."stage"("stage_num") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "grade" ADD CONSTRAINT "grade_school_year_year_school_year_fk" FOREIGN KEY ("school_year") REFERENCES "public"."year"("school_year") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "grade" ADD CONSTRAINT "grade_course_id_course_course_id_fk" FOREIGN KEY ("course_id") REFERENCES "public"."course"("course_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "grade" ADD CONSTRAINT "grade_student_id_student_student_id_fk" FOREIGN KEY ("student_id") REFERENCES "public"."student"("student_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "major" ADD CONSTRAINT "major_field_id_field_field_id_fk" FOREIGN KEY ("field_id") REFERENCES "public"."field"("field_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "major" ADD CONSTRAINT "major_subfield_id_subfield_subfield_id_fk" FOREIGN KEY ("subfield_id") REFERENCES "public"."subfield"("subfield_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "student" ADD CONSTRAINT "student_field_id_field_field_id_fk" FOREIGN KEY ("field_id") REFERENCES "public"."field"("field_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "student" ADD CONSTRAINT "student_subfield_id_subfield_subfield_id_fk" FOREIGN KEY ("subfield_id") REFERENCES "public"."subfield"("subfield_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "student" ADD CONSTRAINT "student_major_id_major_major_id_fk" FOREIGN KEY ("major_id") REFERENCES "public"."major"("major_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "student" ADD CONSTRAINT "student_application_id_form_of_application_application_id_fk" FOREIGN KEY ("application_id") REFERENCES "public"."form_of_application"("application_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "student" ADD CONSTRAINT "student_school_year_year_school_year_fk" FOREIGN KEY ("school_year") REFERENCES "public"."year"("school_year") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "student_performance" ADD CONSTRAINT "student_performance_school_year_year_school_year_fk" FOREIGN KEY ("school_year") REFERENCES "public"."year"("school_year") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "student_performance" ADD CONSTRAINT "student_performance_student_id_student_student_id_fk" FOREIGN KEY ("student_id") REFERENCES "public"."student"("student_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "student_performance" ADD CONSTRAINT "student_performance_field_id_field_field_id_fk" FOREIGN KEY ("field_id") REFERENCES "public"."field"("field_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "student_performance" ADD CONSTRAINT "student_performance_subfield_id_subfield_subfield_id_fk" FOREIGN KEY ("subfield_id") REFERENCES "public"."subfield"("subfield_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "student_performance" ADD CONSTRAINT "student_performance_major_id_major_major_id_fk" FOREIGN KEY ("major_id") REFERENCES "public"."major"("major_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "subfield" ADD CONSTRAINT "subfield_field_id_field_field_id_fk" FOREIGN KEY ("field_id") REFERENCES "public"."field"("field_id") ON DELETE no action ON UPDATE no action;