package config

import (
	"log"

	"github.com/spf13/viper"
)

// SetupVars setups all the config variables to run application
func SetupVars() {
	viper.AddConfigPath(".")
	viper.SetConfigName("config")
	viper.SetEnvPrefix("kavach")
	viper.AutomaticEnv()

	err := viper.ReadInConfig()
	if err != nil {
		log.Println("config file not found...")
	}

	if !viper.IsSet("database_host") {
		log.Fatal("please provide database_host config param")
	}

	if !viper.IsSet("database_user") {
		log.Fatal("please provide database_user config param")
	}

	if !viper.IsSet("database_name") {
		log.Fatal("please provide database_name config param")
	}

	if !viper.IsSet("database_password") {
		log.Fatal("please provide database_password config param")
	}

	if !viper.IsSet("database_port") {
		log.Fatal("please provide database_port config param")
	}

	if !viper.IsSet("database_ssl_mode") {
		log.Fatal("please provide database_ssl_mode config param")
	}

	if !viper.IsSet("keto_url") {
		log.Fatal("please provide keto_url in config")
	}

	if !viper.IsSet("sendgrid_api_key") {
		log.Fatal("please provide sendgrid api key in config")
	}
	
	if !viper.IsSet("kratos_admin_url") {
		log.Fatal("please provide kratos_admin_url in config")
	}

	if Sqlite() {
		if !viper.IsSet("sqlite_db_path") {
			log.Fatal("please provide sqlite_db_path config param")
		}
	}
}

func Sqlite() bool {
	return viper.IsSet("use_sqlite") && viper.GetBool("use_sqlite")
}
