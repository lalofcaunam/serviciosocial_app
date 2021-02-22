package com.lalofcaunam.estudiafca.Profesor;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

import androidx.appcompat.app.AppCompatActivity;

import com.lalofcaunam.estudiafca.Alumno.Cuestionarios;
import com.lalofcaunam.estudiafca.R;

public class CuestionariosProfesor extends AppCompatActivity {

    Button btnAddCuestionario;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_cuestionarios_profesor);
        initComponents();
    }

    public void initComponents(){
        btnAddCuestionario = findViewById(R.id.btnAddCuestionario);
        listeners();
    }

    public void listeners(){
        btnAddCuestionario.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent addNewCuestionario=new Intent(CuestionariosProfesor.this, AddCuestionario.class);
                startActivity(addNewCuestionario);
            }
        });
    }

}
