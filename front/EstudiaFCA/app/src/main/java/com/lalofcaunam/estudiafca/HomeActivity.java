package com.lalofcaunam.estudiafca;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;

import com.lalofcaunam.estudiafca.Alumno.CuestionariosAlumno;
import com.lalofcaunam.estudiafca.Login.LoginActivity;
import com.lalofcaunam.estudiafca.Modelos.Login;
import com.lalofcaunam.estudiafca.Profesor.CuestionariosProfesor;

public class HomeActivity extends AppCompatActivity {

    private SharedPreferences preferences;
    Boolean isLogin;
    String rol;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        preferences = getSharedPreferences("Preferences", MODE_PRIVATE);

        isLogin = preferences.getBoolean("isLogin", false);
        rol = preferences.getString("rol", "");

        if(isLogin){
            if (rol.equals("profesor")){
                Intent intent = new Intent(HomeActivity.this, CuestionariosProfesor.class);
                startActivity(intent);
                finish();
            } else {
                Intent intent = new Intent(HomeActivity.this, CuestionariosAlumno.class);
                startActivity(intent);
                finish();
            }
        } else {
            Intent intent = new Intent(HomeActivity.this, LoginActivity.class);
            startActivity(intent);
            finish();
        }

    }
}