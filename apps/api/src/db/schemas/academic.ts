import {
	char,
	integer,
	numeric,
	pgTable,
	primaryKey,
	varchar,
} from "drizzle-orm/pg-core";

// ─── Lookup / Reference Tables ────────────────────────────────────────────────

export const field = pgTable("field", {
	fieldId: char("field_id", { length: 2 }).primaryKey(),
	fieldName: varchar("field_name", { length: 100 }).notNull(),
});

export const subfield = pgTable("subfield", {
	fieldId: char("field_id", { length: 2 })
		.notNull()
		.references(() => field.fieldId),
	subfieldId: char("subfield_id", { length: 4 }).primaryKey(),
	subfieldName: varchar("subfield_name", { length: 100 }).notNull(),
});

export const major = pgTable("major", {
	fieldId: char("field_id", { length: 2 })
		.notNull()
		.references(() => field.fieldId),
	subfieldId: char("subfield_id", { length: 4 })
		.notNull()
		.references(() => subfield.subfieldId),
	majorId: char("major_id", { length: 6 }).primaryKey(),
	majorName: varchar("major_name", { length: 100 }).notNull(),
});

export const stage = pgTable("stage", {
	stageNum: integer("stage_num").primaryKey(),
});

export const year = pgTable("year", {
	schoolYear: varchar("school_year", { length: 11 }).primaryKey(),
});

export const formOfApplication = pgTable("form_of_application", {
	applicationId: char("application_id", { length: 4 }).primaryKey(),
	applicationName: varchar("application_name", { length: 100 }).notNull(),
});

// ─── Core Domain Tables ───────────────────────────────────────────────────────

export const course = pgTable("course", {
	courseId: varchar("course_id", { length: 8 }).primaryKey(),
	courseName: varchar("course_name", { length: 100 }).notNull(),
	credits: integer("credits"),
	theoreticalCredits: integer("theoretical_credits"),
	practicalCredits: integer("practical_credits"),
	stage: integer("stage").references(() => stage.stageNum),
	optional11: char("optional_11", { length: 2 }).notNull(),
	optional28: char("optional_28", { length: 2 }).notNull(),
	compulsoryForSpecific11: varchar("compulsory_for_specific_11", { length: 100 }),
	courseGroup: varchar("course_group", { length: 100 }),
});

export const student = pgTable("student", {
	studentId: char("student_id", { length: 8 }).primaryKey(),
	gender: varchar("gender", { length: 3 }).notNull(),
	academicDegree: varchar("academic_degree", { length: 10 }).notNull(),
	fieldId: char("field_id", { length: 2 }).references(() => field.fieldId),
	subfieldId: char("subfield_id", { length: 4 }).references(() => subfield.subfieldId),
	majorId: char("major_id", { length: 6 }).references(() => major.majorId),
	applicationId: char("application_id", { length: 4 }).references(
		() => formOfApplication.applicationId,
	),
	highschoolName: varchar("highschool_name", { length: 200 }).notNull(),
	honorProgram: varchar("honor_program", { length: 5 }),
	schoolYear: varchar("school_year", { length: 11 })
		.notNull()
		.references(() => year.schoolYear),
});

export const grade = pgTable(
	"grade",
	{
		schoolYear: varchar("school_year", { length: 11 })
			.notNull()
			.references(() => year.schoolYear),
		semester: char("semester", { length: 3 }).notNull(),
		courseId: varchar("course_id", { length: 8 })
			.notNull()
			.references(() => course.courseId),
		studentId: char("student_id", { length: 8 })
			.notNull()
			.references(() => student.studentId),
		finalScore: numeric("final_score", { precision: 5, scale: 2 }),
	},
	(table) => [
		primaryKey({
			columns: [table.schoolYear, table.semester, table.courseId, table.studentId],
		}),
	],
);

export const studentPerformance = pgTable(
	"student_performance",
	{
		schoolYear: varchar("school_year", { length: 11 })
			.notNull()
			.references(() => year.schoolYear),
		semester: char("semester", { length: 3 }).notNull(),
		studentId: char("student_id", { length: 8 })
			.notNull()
			.references(() => student.studentId),
		fieldId: char("field_id", { length: 2 }).references(() => field.fieldId),
		subfieldId: char("subfield_id", { length: 4 }).references(() => subfield.subfieldId),
		majorId: char("major_id", { length: 6 }).references(() => major.majorId),
		status: varchar("status", { length: 20 }).notNull(),
	},
	(table) => [
		primaryKey({ columns: [table.schoolYear, table.semester, table.studentId] }),
	],
);
