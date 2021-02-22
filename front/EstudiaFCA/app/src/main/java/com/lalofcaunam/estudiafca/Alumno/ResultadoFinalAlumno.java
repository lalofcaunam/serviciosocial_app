package com.lalofcaunam.estudiafca.Alumno;

import android.os.Bundle;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;

import com.lalofcaunam.estudiafca.R;

public class ResultadoFinalAlumno extends AppCompatActivity {

    TextView textRespuesta1;
    String respuesta1;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_add_resultado_alumno);
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);
        initComponents();
    }

    public void initComponents() {
        Bundle extras = getIntent().getExtras();
        respuesta1 = extras.getString("tituloCuestionario");

        textRespuesta1 = findViewById(R.id.textRespuesta1);
        setData();
    }

    public void setData(){
        textRespuesta1.setText(respuesta1);
    }

}
