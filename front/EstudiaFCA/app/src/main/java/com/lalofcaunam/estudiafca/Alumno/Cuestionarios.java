package com.lalofcaunam.estudiafca.Alumno;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;

import com.lalofcaunam.estudiafca.Login.LoginActivity;
import com.lalofcaunam.estudiafca.Login.ProfileActivity;
import com.lalofcaunam.estudiafca.Profesor.AddCuestionario;
import com.lalofcaunam.estudiafca.R;

public class Cuestionarios extends AppCompatActivity {


    String rol;
    TextView textCuestionarios;
    Button btnAddCuestionario;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_cuestionarios);
        Intent intent = getIntent();
        rol = intent.getStringExtra("rol");
        initComponents();
    }

    public void initComponents(){
        textCuestionarios = findViewById(R.id.textCuestionarios);
        btnAddCuestionario = findViewById(R.id.btnAddCuestionario);
        getData();
    }

    public void getData(){
        if (rol.equals("profesor")){
            textCuestionarios.setText("Cuestionarios Profesor");

            btnAddCuestionario.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    startActivity(new Intent(Cuestionarios.this, AddCuestionario.class));
                }
            });

        } else {
            textCuestionarios.setText("Cuestionarios Alumno");
            btnAddCuestionario.setVisibility(View.GONE);
        }
    }
}
