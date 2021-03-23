package com.lalofcaunam.estudiafca.Alumno;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;

import com.lalofcaunam.estudiafca.Profesor.AddPreguntaCuestionario;
import com.lalofcaunam.estudiafca.Profesor.PreguntasCuestionario;
import com.lalofcaunam.estudiafca.R;

public class ResultadoFinalAlumno extends AppCompatActivity {

    Button btnOkResultado;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_info_historial);
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);

        initComponents();
    }

    public void initComponents(){
        btnOkResultado = findViewById(R.id.btnOkResultado);
        listeners();
    }

    public void listeners(){
        btnOkResultado.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent ok = new Intent(ResultadoFinalAlumno.this, ResultadosCuestionarioAlumno.class);
                startActivity(ok);
                finish();
            }
        });
    }

}
