package token

import (
	"encoding/json"
	"errors"
	"net/http"
	"strconv"

	"github.com/factly/kavach-server/model"
	"github.com/factly/x/errorx"
	"github.com/factly/x/loggerx"
	"github.com/factly/x/renderx"
	"github.com/factly/x/validationx"
	"github.com/go-chi/chi"
)



func Validate(w http.ResponseWriter, r *http.Request) {
	sID := chi.URLParam(r, "space_id")
	spaceID, err := strconv.Atoi(sID)
	if err != nil {
		loggerx.Error(err)
		errorx.Render(w, errorx.Parser(errorx.InvalidID()))
		return
	}

	tokenBody := model.ValidationBody{}
	err = json.NewDecoder(r.Body).Decode(&tokenBody)
	if err != nil {
		loggerx.Error(err)
		errorx.Render(w, errorx.Parser(errorx.DecodeError()))
		return
	}

	validationError := validationx.Check(tokenBody)
	if validationError != nil {
		loggerx.Error(errors.New("validation error"))
		errorx.Render(w, validationError)
		return
	}

	spaceToken := model.SpaceToken{}
	err = model.DB.Model(&model.SpaceToken{}).Where(&model.SpaceToken{
		Token: tokenBody.Token,
	}).Find(&spaceToken).Error
	if err != nil {
		loggerx.Error(err)
		errorx.Render(w, errorx.Parser(errorx.Unauthorized()))
		return
	}

	if spaceToken.SpaceID != uint(spaceID) {
		renderx.JSON(w, http.StatusUnauthorized, map[string]interface{}{"valid": false})
		return
	}

	renderx.JSON(w, http.StatusOK, map[string]interface{}{"valid": true})
}
