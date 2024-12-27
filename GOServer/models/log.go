package models

import (
	"time"
)

type Log struct {
	ID          uint      `gorm:"primaryKey;autoIncrement"`
	Description string    `gorm:"not null"`
	Goods       string    `gorm:"type:json"` // Use string to store JSON as text
	Type        string    `gorm:"type:json"` // Use string to store JSON as text
	Total       int       `gorm:"not null"`
	UserID      uint      `gorm:"not null"`
	User        User      `gorm:"foreignKey:UserID"`
	CreatedAt   time.Time `gorm:"autoCreateTime"`
	UpdatedAt   time.Time `gorm:"autoUpdateTime"`
}
