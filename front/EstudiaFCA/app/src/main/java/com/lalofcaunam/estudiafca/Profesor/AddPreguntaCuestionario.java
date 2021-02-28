package com.lalofcaunam.estudiafca.Profesor;

import android.os.Bundle;

import androidx.appcompat.app.AppCompatActivity;

import com.lalofcaunam.estudiafca.R;

public class AddPreguntaCuestionario extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_add_pregunta);
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);
        
    }
}
