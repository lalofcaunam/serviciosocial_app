package com.lalofcaunam.estudiafca.Login;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

import androidx.appcompat.app.AppCompatActivity;

import com.lalofcaunam.estudiafca.Alumno.CuestionariosAlumno;
import com.lalofcaunam.estudiafca.Alumno.ResultadosCuestionarioAlumno;
import com.lalofcaunam.estudiafca.R;

public class ProfileActivity extends AppCompatActivity {

    Button btnProfesor, btnAlumno;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_profile);
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);

        btnProfesor = findViewById(R.id.btnProfesor);
        btnAlumno = findViewById(R.id.btnAlumno);

        btnProfesor.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent registraProfesor = new Intent(ProfileActivity.this, SignupActivity.class);
                registraProfesor.putExtra("rol", "Profesor");
                startActivity(registraProfesor);
                finish();
            }
        });


        btnAlumno.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent registraAlumno = new Intent(ProfileActivity.this, SignupActivity.class);
                registraAlumno.putExtra("rol", "Alumno");
                startActivity(registraAlumno);
                finish();
            }
        });

    }

}
