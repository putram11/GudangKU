package middlewares

import (
	"errors"
	"github.com/putram11/GudangKU/GOServer/models"
	"github.com/putram11/GudangKU/GOServer/helpers"
	"net/http"
	"strings"

	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
)

// Authentication middleware
func Authentication(db *gorm.DB) echo.MiddlewareFunc {
	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			// Mengambil header Authorization
			authHeader := c.Request().Header.Get("Authorization")
			if authHeader == "" {
				return echo.NewHTTPError(http.StatusUnauthorized, "Authorization header missing")
			}

			// Memisahkan token dari header
			tokenParts := strings.Split(authHeader, " ")
			if len(tokenParts) != 2 || tokenParts[0] != "Bearer" {
				return echo.NewHTTPError(http.StatusUnauthorized, "Invalid authorization format")
			}
			token := tokenParts[1]

			// Memverifikasi token
			decoded, err := helpers.VerifyToken(token)
			if err != nil {
				return echo.NewHTTPError(http.StatusUnauthorized, "Invalid or expired token")
			}

			// Memastikan user ada di database
			var user models.User
			if err := db.First(&user, "id = ?", decoded.ID).Error; err != nil {
				if errors.Is(err, gorm.ErrRecordNotFound) {
					return echo.NewHTTPError(http.StatusUnauthorized, "User not found")
				}
				return echo.NewHTTPError(http.StatusInternalServerError, "Database error")
			}

			// Menyimpan user ke context
			c.Set("user", user)
			return next(c)
		}
	}
}
