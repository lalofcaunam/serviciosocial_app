package com.lalofcaunam.estudiafca.Alumno;

import android.os.Bundle;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;

import com.lalofcaunam.estudiafca.R;

public class ResultadoFinalAlumno extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_info_historial);
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);
    }

}
