-- ============================================
-- 体育与健康知识在线练习系统 - MySQL 数据库初始化脚本
-- ============================================

-- 创建数据库
CREATE DATABASE IF NOT EXISTS health_exam DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE health_exam;

-- ============================================
-- 表结构
-- ============================================

-- 题目表（统一存储单选题和判断题）
DROP TABLE IF EXISTS questions;
CREATE TABLE questions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    content TEXT NOT NULL COMMENT '题目内容',
    type ENUM('choice', 'judge') NOT NULL COMMENT '题目类型',
    option_a VARCHAR(500) DEFAULT NULL COMMENT '选项A',
    option_b VARCHAR(500) DEFAULT NULL COMMENT '选项B',
    option_c VARCHAR(500) DEFAULT NULL COMMENT '选项C',
    option_d VARCHAR(500) DEFAULT NULL COMMENT '选项D',
    answer VARCHAR(10) NOT NULL COMMENT '正确答案：A/B/C/D 或 T/F',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_type (type)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='题目表';

-- 考试记录表
DROP TABLE IF EXISTS exam_results;
CREATE TABLE exam_results (
    id INT AUTO_INCREMENT PRIMARY KEY,
    mode ENUM('exam', 'choice', 'judge') NOT NULL COMMENT '考试模式',
    score INT NOT NULL DEFAULT 0 COMMENT '得分',
    correct_count INT NOT NULL DEFAULT 0 COMMENT '正确数量',
    wrong_count INT NOT NULL DEFAULT 0 COMMENT '错误数量',
    unanswered_count INT NOT NULL DEFAULT 0 COMMENT '未答数量',
    total_questions INT NOT NULL DEFAULT 0 COMMENT '总题数',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_mode (mode),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='考试记录表';
