package com.lalofcaunam.estudiafca.Profesor;

import android.content.Intent;
import android.os.Bundle;

import androidx.appcompat.app.AppCompatActivity;

import com.lalofcaunam.estudiafca.Alumno.Cuestionarios;
import com.lalofcaunam.estudiafca.Login.LoginActivity;
import com.lalofcaunam.estudiafca.R;

public class AddCuestionario extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_add_cuestionario);
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);

    }
}
