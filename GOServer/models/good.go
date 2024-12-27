package models

import (
	"time"
)

type Good struct {
	ID            uint      `gorm:"primaryKey;autoIncrement"`
	Name          string    `gorm:"not null"`
	NumberOfItems int       `gorm:"not null"`
	Price         int       `gorm:"not null"`
	CategoryID    uint      `gorm:"not null"`
	CreatedAt     time.Time `gorm:"autoCreateTime"`
	UpdatedAt     time.Time `gorm:"autoUpdateTime"`
}
