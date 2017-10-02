/*    ==Scripting Parameters==

    Source Server Version : SQL Server 2016 (13.0.4001)
    Source Database Engine Edition : Microsoft SQL Server Enterprise Edition
    Source Database Engine Type : Standalone SQL Server

    Target Server Version : SQL Server 2017
    Target Database Engine Edition : Microsoft SQL Server Standard Edition
    Target Database Engine Type : Standalone SQL Server
*/
USE [tasdb]
GO
/****** Object:  Table [dbo].[course_classroom_tb]    Script Date: 9/29/2017 5:11:23 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[course_classroom_tb](
	[course_classroom_id] [uniqueidentifier] NOT NULL,
	[course_classroom_code] [varchar](10) NULL,
	[course_classroom_name] [varchar](50) NULL,
	[course_classroom_description] [varchar](255) NULL,
	[course_classroom_capacity] [int] NULL,
	[course_classroom_location] [varchar](50) NULL,
 CONSTRAINT [PK_Course_Classroom] PRIMARY KEY CLUSTERED 
(
	[course_classroom_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[course_name_tb]    Script Date: 9/29/2017 5:11:23 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[course_name_tb](
	[course_name_id] [uniqueidentifier] NOT NULL,
	[course_name_code] [varchar](50) NULL,
	[course_name_name] [varchar](255) NULL,
	[course_name_description] [text] NULL,
	[course_type_id] [uniqueidentifier] NULL,
 CONSTRAINT [PK_course_name_tb] PRIMARY KEY CLUSTERED 
(
	[course_name_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[course_type_tb]    Script Date: 9/29/2017 5:11:23 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[course_type_tb](
	[course_type_id] [uniqueidentifier] NOT NULL,
	[course_type_name] [varchar](255) NULL,
	[course_type_description] [varchar](255) NULL,
	[course_type_level] [tinyint] NULL,
	[course_type_group] [varchar](50) NULL,
 CONSTRAINT [PK_course_type_tb] PRIMARY KEY CLUSTERED 
(
	[course_type_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[division_tb]    Script Date: 9/29/2017 5:11:23 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[division_tb](
	[division_id] [uniqueidentifier] NOT NULL,
	[division_code] [varchar](10) NULL,
	[division_name] [varchar](50) NULL,
	[division_description] [varchar](255) NULL,
	[job_family_id] [uniqueidentifier] NULL,
 CONSTRAINT [PK_Division] PRIMARY KEY CLUSTERED 
(
	[division_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[eligible_user_tb]    Script Date: 9/29/2017 5:11:23 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[eligible_user_tb](
	[eligible_user_id] [uniqueidentifier] NOT NULL,
	[user_id] [uniqueidentifier] NULL,
	[training_id] [uniqueidentifier] NULL,
	[created_at] [datetime] NULL,
	[created_by] [varchar](50) NULL,
	[updated_at] [datetime] NULL,
	[updated_by] [varchar](50) NULL,
	[deleted_by] [varchar](50) NULL,
 CONSTRAINT [PK_Eligible_User] PRIMARY KEY CLUSTERED 
(
	[eligible_user_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[grade_tb]    Script Date: 9/29/2017 5:11:23 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[grade_tb](
	[grade_id] [uniqueidentifier] NOT NULL,
	[grade_code] [varchar](10) NULL,
	[grade_name] [varchar](50) NULL,
	[grade_description] [varchar](255) NULL,
	[job_family_id] [uniqueidentifier] NULL,
 CONSTRAINT [PK_Grade] PRIMARY KEY CLUSTERED 
(
	[grade_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[job_family_tb]    Script Date: 9/29/2017 5:11:23 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[job_family_tb](
	[job_family_id] [uniqueidentifier] NOT NULL,
	[job_family_code] [varchar](10) NULL,
	[job_family_name] [varchar](50) NULL,
	[job_family_description] [varchar](255) NULL,
 CONSTRAINT [PK_Job_Family] PRIMARY KEY CLUSTERED 
(
	[job_family_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[role_tb]    Script Date: 9/29/2017 5:11:23 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[role_tb](
	[role_id] [uniqueidentifier] NOT NULL,
	[role_code] [varchar](10) NOT NULL,
	[role_name] [varchar](50) NULL,
	[role_description] [varchar](255) NULL,
 CONSTRAINT [PK_Roles] PRIMARY KEY CLUSTERED 
(
	[role_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[trainer_tb]    Script Date: 9/29/2017 5:11:23 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[trainer_tb](
	[trainer_id] [uniqueidentifier] NOT NULL,
	[trainer_status] [varchar](50) NULL,
	[user_id] [uniqueidentifier] NULL,
	[training_course_id] [uniqueidentifier] NULL,
	[created_at] [datetime] NULL,
	[created_by] [varchar](50) NULL,
	[updated_at] [datetime] NULL,
	[updated_by] [varchar](50) NULL,
	[deleted_by] [varchar](50) NULL,
 CONSTRAINT [PK_trainer_tb] PRIMARY KEY CLUSTERED 
(
	[trainer_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[training_course_tb]    Script Date: 9/29/2017 5:11:23 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[training_course_tb](
	[training_course_id] [uniqueidentifier] NOT NULL,
	[training_course_name] [varchar](50) NULL,
	[training_course_description] [text] NULL,
	[training_course_start_date] [date] NULL,
	[training_course_start_time] [time](7) NULL,
	[training_course_end_date] [date] NULL,
	[training_course_end_time] [time](7) NULL,
	[training_course_capacity] [int] NULL,
	[training_course_status] [varchar](50) NULL,
	[training_course_type] [varchar](50) NULL,
	[created_at] [datetime] NULL,
	[created_by] [varchar](50) NULL,
	[updated_at] [datetime] NULL,
	[updated_by] [varchar](50) NULL,
	[deleted_by] [varchar](50) NULL,
	[training_id] [uniqueidentifier] NULL,
	[course_classroom_id] [uniqueidentifier] NULL,
	[course_name_id] [uniqueidentifier] NULL,
 CONSTRAINT [PK_Training_Course] PRIMARY KEY CLUSTERED 
(
	[training_course_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[training_tb]    Script Date: 9/29/2017 5:11:23 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[training_tb](
	[training_id] [uniqueidentifier] NOT NULL,
	[training_name] [varchar](255) NULL,
	[training_status] [varchar](50) NULL,
	[training_description] [text] NULL,
	[training_start_date] [date] NULL,
	[training_end_date] [date] NULL,
	[created_at] [datetime] NULL,
	[created_by] [varchar](50) NULL,
	[updated_at] [datetime] NULL,
	[updated_by] [varchar](50) NULL,
	[deleted_by] [varchar](50) NULL,
 CONSTRAINT [PK_Training] PRIMARY KEY CLUSTERED 
(
	[training_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[user_course_attendance_tb]    Script Date: 9/29/2017 5:11:23 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[user_course_attendance_tb](
	[user_course_attendance_id] [uniqueidentifier] NOT NULL,
	[user_course_attendance_code] [varchar](10) NULL,
	[user_course_attendance_name] [varchar](50) NULL,
	[user_course_attendance_description] [varchar](255) NULL,
 CONSTRAINT [PK_User_Course_Attendance] PRIMARY KEY CLUSTERED 
(
	[user_course_attendance_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[user_course_detail_tb]    Script Date: 9/29/2017 5:11:23 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[user_course_detail_tb](
	[user_course_detail_id] [uniqueidentifier] NOT NULL,
	[user_course_detail_start_date] [date] NULL,
	[user_course_detail_end_date] [date] NULL,
	[user_course_detail_start_time] [time](7) NULL,
	[user_course_detail_end_time] [time](7) NULL,
	[user_course_id] [uniqueidentifier] NULL,
	[user_course_attendance_id] [uniqueidentifier] NULL,
 CONSTRAINT [PK_Course_Detail] PRIMARY KEY CLUSTERED 
(
	[user_course_detail_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[user_course_tb]    Script Date: 9/29/2017 5:11:23 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[user_course_tb](
	[user_course_id] [uniqueidentifier] NOT NULL,
	[user_course_status] [varchar](50) NULL,
	[user_course_description] [text] NULL,
	[user_course_average_score] [varchar](50) NULL,
	[user_course_final_score] [varchar](50) NULL,
	[user_course_final_test] [varchar](50) NULL,
	[user_id] [uniqueidentifier] NULL,
	[training_course_id] [uniqueidentifier] NULL,
	[created_at] [datetime] NULL,
	[created_by] [varchar](50) NULL,
	[updated_at] [datetime] NULL,
	[updated_by] [varchar](50) NULL,
	[deleted_by] [varchar](50) NULL,
 CONSTRAINT [PK_User_Course] PRIMARY KEY CLUSTERED 
(
	[user_course_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[user_role_tb]    Script Date: 9/29/2017 5:11:23 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[user_role_tb](
	[user_role_id] [uniqueidentifier] NOT NULL,
	[user_role_status] [varchar](50) NULL,
	[user_id] [uniqueidentifier] NULL,
	[role_id] [uniqueidentifier] NULL,
	[created_at] [datetime] NULL,
	[created_by] [varchar](50) NULL,
	[updated_at] [datetime] NULL,
	[updated_by] [varchar](50) NULL,
	[deleted_by] [varchar](50) NULL,
 CONSTRAINT [PK_User_Role] PRIMARY KEY CLUSTERED 
(
	[user_role_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[user_tb]    Script Date: 9/29/2017 5:11:23 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[user_tb](
	[user_id] [uniqueidentifier] NOT NULL,
	[user_full_name] [varchar](100) NULL,
	[user_email] [varchar](100) NULL,
	[user_account_name] [varchar](100) NULL,
	[user_password] [text] NULL,
	[user_replacement] [tinyint] NULL,
	[user_status] [varchar](50) NULL,
	[created_at] [datetime] NULL,
	[created_by] [varchar](50) NULL,
	[updated_at] [datetime] NULL,
	[updated_by] [varchar](50) NULL,
	[deleted_by] [varchar](50) NULL,
	[grade_id] [uniqueidentifier] NULL,
	[division_id] [uniqueidentifier] NULL,
 CONSTRAINT [PK_User] PRIMARY KEY CLUSTERED 
(
	[user_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
ALTER TABLE [dbo].[course_classroom_tb] ADD  CONSTRAINT [DF__course_cl__cours__367C1819]  DEFAULT (newid()) FOR [course_classroom_id]
GO
ALTER TABLE [dbo].[course_name_tb] ADD  CONSTRAINT [DF_course_name_tb_course_name_id]  DEFAULT (newid()) FOR [course_name_id]
GO
ALTER TABLE [dbo].[course_type_tb] ADD  DEFAULT (newid()) FOR [course_type_id]
GO
ALTER TABLE [dbo].[division_tb] ADD  CONSTRAINT [DF__division___devis__3B40CD36]  DEFAULT (newid()) FOR [division_id]
GO
ALTER TABLE [dbo].[eligible_user_tb] ADD  DEFAULT (newid()) FOR [eligible_user_id]
GO
ALTER TABLE [dbo].[grade_tb] ADD  CONSTRAINT [DF__grade_tb__grade___3F115E1A]  DEFAULT (newid()) FOR [grade_id]
GO
ALTER TABLE [dbo].[job_family_tb] ADD  CONSTRAINT [DF__job_famil__job_f__40F9A68C]  DEFAULT (newid()) FOR [job_family_id]
GO
ALTER TABLE [dbo].[role_tb] ADD  CONSTRAINT [DF__role_tb__role_id__42E1EEFE]  DEFAULT (newid()) FOR [role_id]
GO
ALTER TABLE [dbo].[trainer_tb] ADD  CONSTRAINT [DF_trainer_tb_trainer_id]  DEFAULT (newid()) FOR [trainer_id]
GO
ALTER TABLE [dbo].[training_course_tb] ADD  CONSTRAINT [DF__training___train__44CA3770]  DEFAULT (newid()) FOR [training_course_id]
GO
ALTER TABLE [dbo].[training_tb] ADD  CONSTRAINT [DF__training___train__46B27FE2]  DEFAULT (newid()) FOR [training_id]
GO
ALTER TABLE [dbo].[user_course_attendance_tb] ADD  DEFAULT (newid()) FOR [user_course_attendance_id]
GO
ALTER TABLE [dbo].[user_course_detail_tb] ADD  DEFAULT (newid()) FOR [user_course_detail_id]
GO
ALTER TABLE [dbo].[user_course_tb] ADD  CONSTRAINT [DF__user_cour__user___4C6B5938]  DEFAULT (newid()) FOR [user_course_id]
GO
ALTER TABLE [dbo].[user_role_tb] ADD  CONSTRAINT [DF__user_role__user___4E53A1AA]  DEFAULT (newid()) FOR [user_role_id]
GO
ALTER TABLE [dbo].[user_tb] ADD  CONSTRAINT [DF__user_tb__user_id__503BEA1C]  DEFAULT (newid()) FOR [user_id]
GO
ALTER TABLE [dbo].[course_name_tb]  WITH CHECK ADD  CONSTRAINT [FK_course_name_tb_course_type_tb] FOREIGN KEY([course_type_id])
REFERENCES [dbo].[course_type_tb] ([course_type_id])
GO
ALTER TABLE [dbo].[course_name_tb] CHECK CONSTRAINT [FK_course_name_tb_course_type_tb]
GO
ALTER TABLE [dbo].[division_tb]  WITH CHECK ADD  CONSTRAINT [FK_Division_Job_Family] FOREIGN KEY([job_family_id])
REFERENCES [dbo].[job_family_tb] ([job_family_id])
GO
ALTER TABLE [dbo].[division_tb] CHECK CONSTRAINT [FK_Division_Job_Family]
GO
ALTER TABLE [dbo].[eligible_user_tb]  WITH CHECK ADD  CONSTRAINT [FK_Eligible_User_Training] FOREIGN KEY([training_id])
REFERENCES [dbo].[training_tb] ([training_id])
GO
ALTER TABLE [dbo].[eligible_user_tb] CHECK CONSTRAINT [FK_Eligible_User_Training]
GO
ALTER TABLE [dbo].[eligible_user_tb]  WITH CHECK ADD  CONSTRAINT [FK_Eligible_User_User] FOREIGN KEY([user_id])
REFERENCES [dbo].[user_tb] ([user_id])
GO
ALTER TABLE [dbo].[eligible_user_tb] CHECK CONSTRAINT [FK_Eligible_User_User]
GO
ALTER TABLE [dbo].[grade_tb]  WITH CHECK ADD  CONSTRAINT [FK_Grade_Job_Family] FOREIGN KEY([job_family_id])
REFERENCES [dbo].[job_family_tb] ([job_family_id])
GO
ALTER TABLE [dbo].[grade_tb] CHECK CONSTRAINT [FK_Grade_Job_Family]
GO
ALTER TABLE [dbo].[trainer_tb]  WITH CHECK ADD  CONSTRAINT [FK_trainer_tb_training_course_tb] FOREIGN KEY([training_course_id])
REFERENCES [dbo].[training_course_tb] ([training_course_id])
GO
ALTER TABLE [dbo].[trainer_tb] CHECK CONSTRAINT [FK_trainer_tb_training_course_tb]
GO
ALTER TABLE [dbo].[trainer_tb]  WITH CHECK ADD  CONSTRAINT [FK_trainer_tb_user_tb] FOREIGN KEY([user_id])
REFERENCES [dbo].[user_tb] ([user_id])
GO
ALTER TABLE [dbo].[trainer_tb] CHECK CONSTRAINT [FK_trainer_tb_user_tb]
GO
ALTER TABLE [dbo].[training_course_tb]  WITH CHECK ADD  CONSTRAINT [FK_Training_Course_Course_Classroom] FOREIGN KEY([course_classroom_id])
REFERENCES [dbo].[course_classroom_tb] ([course_classroom_id])
GO
ALTER TABLE [dbo].[training_course_tb] CHECK CONSTRAINT [FK_Training_Course_Course_Classroom]
GO
ALTER TABLE [dbo].[training_course_tb]  WITH CHECK ADD  CONSTRAINT [FK_training_course_tb_course_name_tb] FOREIGN KEY([course_name_id])
REFERENCES [dbo].[course_name_tb] ([course_name_id])
GO
ALTER TABLE [dbo].[training_course_tb] CHECK CONSTRAINT [FK_training_course_tb_course_name_tb]
GO
ALTER TABLE [dbo].[training_course_tb]  WITH CHECK ADD  CONSTRAINT [FK_Training_Course_Training] FOREIGN KEY([training_id])
REFERENCES [dbo].[training_tb] ([training_id])
GO
ALTER TABLE [dbo].[training_course_tb] CHECK CONSTRAINT [FK_Training_Course_Training]
GO
ALTER TABLE [dbo].[user_course_detail_tb]  WITH CHECK ADD  CONSTRAINT [FK_User_Course_Detail_User_Course] FOREIGN KEY([user_course_id])
REFERENCES [dbo].[user_course_tb] ([user_course_id])
GO
ALTER TABLE [dbo].[user_course_detail_tb] CHECK CONSTRAINT [FK_User_Course_Detail_User_Course]
GO
ALTER TABLE [dbo].[user_course_detail_tb]  WITH CHECK ADD  CONSTRAINT [FK_User_Course_Detail_User_Course_Attendance] FOREIGN KEY([user_course_attendance_id])
REFERENCES [dbo].[user_course_attendance_tb] ([user_course_attendance_id])
GO
ALTER TABLE [dbo].[user_course_detail_tb] CHECK CONSTRAINT [FK_User_Course_Detail_User_Course_Attendance]
GO
ALTER TABLE [dbo].[user_course_tb]  WITH CHECK ADD  CONSTRAINT [FK_User_Course_Training_Course] FOREIGN KEY([training_course_id])
REFERENCES [dbo].[training_course_tb] ([training_course_id])
GO
ALTER TABLE [dbo].[user_course_tb] CHECK CONSTRAINT [FK_User_Course_Training_Course]
GO
ALTER TABLE [dbo].[user_course_tb]  WITH CHECK ADD  CONSTRAINT [FK_User_Course_User] FOREIGN KEY([user_id])
REFERENCES [dbo].[user_tb] ([user_id])
GO
ALTER TABLE [dbo].[user_course_tb] CHECK CONSTRAINT [FK_User_Course_User]
GO
ALTER TABLE [dbo].[user_role_tb]  WITH CHECK ADD  CONSTRAINT [FK_User_Role_Roles] FOREIGN KEY([role_id])
REFERENCES [dbo].[role_tb] ([role_id])
GO
ALTER TABLE [dbo].[user_role_tb] CHECK CONSTRAINT [FK_User_Role_Roles]
GO
ALTER TABLE [dbo].[user_role_tb]  WITH CHECK ADD  CONSTRAINT [FK_User_Role_User] FOREIGN KEY([user_id])
REFERENCES [dbo].[user_tb] ([user_id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[user_role_tb] CHECK CONSTRAINT [FK_User_Role_User]
GO
ALTER TABLE [dbo].[user_tb]  WITH CHECK ADD  CONSTRAINT [FK_User_Division] FOREIGN KEY([division_id])
REFERENCES [dbo].[division_tb] ([division_id])
GO
ALTER TABLE [dbo].[user_tb] CHECK CONSTRAINT [FK_User_Division]
GO
ALTER TABLE [dbo].[user_tb]  WITH CHECK ADD  CONSTRAINT [FK_User_Grade] FOREIGN KEY([grade_id])
REFERENCES [dbo].[grade_tb] ([grade_id])
GO
ALTER TABLE [dbo].[user_tb] CHECK CONSTRAINT [FK_User_Grade]
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Agung also was here' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'division_tb'
GO
