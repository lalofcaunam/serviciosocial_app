package com.lalofcaunam.estudiafca.Alumno;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import com.lalofcaunam.estudiafca.R;

public class ResultadosCuestionarioAlumno extends AppCompatActivity {

    TextView textResultadoCuestionariosAlumno;
    String titulo;
    Button btnAddResultadoCuestionarioAlumno;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_resultados_cuestionario_alumno);
        initComponents();
    }

    public void initComponents() {
        Bundle extras = getIntent().getExtras();
        titulo = extras.getString("tituloCuestionario");

        textResultadoCuestionariosAlumno = findViewById(R.id.textResultadoCuestionariosAlumno);
        btnAddResultadoCuestionarioAlumno = findViewById(R.id.btnAddResultadoCuestionarioAlumno);

        setData();
        listener();
    }

    public void setData(){
        textResultadoCuestionariosAlumno.setText(titulo);
    }

    public void listener(){
        btnAddResultadoCuestionarioAlumno.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent addResultadoAlumno = new Intent(ResultadosCuestionarioAlumno.this, AddResultadoCuestionario.class);
                addResultadoAlumno.putExtra("textPregunta", titulo);
                startActivity(addResultadoAlumno);
            }
        });
    }
}
