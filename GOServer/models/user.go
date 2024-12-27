package models

import (
	"time"
)

type User struct {
	ID          uint      `gorm:"primaryKey;autoIncrement"`
	Email       string    `gorm:"not null;unique"`
	Password    string    `gorm:"not null"`
	Name        string    `gorm:"not null"`
	Position    string    `gorm:"not null"`
	PhoneNumber string    `gorm:"not null"`
	CreatedAt   time.Time `gorm:"autoCreateTime"`
	UpdatedAt   time.Time `gorm:"autoUpdateTime"`
	Logs        []Log     `gorm:"foreignKey:UserID"`
}
