package com.lalofcaunam.estudiafca.Profesor;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

import androidx.appcompat.app.AppCompatActivity;

import com.lalofcaunam.estudiafca.R;

public class AddInfoCuestionario extends AppCompatActivity {

    Button confirmInfoCuestionario;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_add_info_cuestionario);
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);
        initComponents();
    }

    public void initComponents(){
        confirmInfoCuestionario = findViewById(R.id.confirmInfoCuestionario);
        listeners();
    }

    public void listeners(){
        confirmInfoCuestionario.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent cuestionarioProfesor = new Intent(AddInfoCuestionario.this, CuestionariosProfesor.class);
                startActivity(cuestionarioProfesor);
            }
        });
    }

}
