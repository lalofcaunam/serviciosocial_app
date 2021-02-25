package com.lalofcaunam.estudiafca.Profesor;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.Spinner;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import com.lalofcaunam.estudiafca.Alumno.Cuestionarios;
import com.lalofcaunam.estudiafca.Login.LoginActivity;
import com.lalofcaunam.estudiafca.R;

public class AddCuestionario extends AppCompatActivity implements AdapterView.OnItemSelectedListener {

    String licenciaturas[] = {"Informatica", "Contaduria", "Administracion"};
    String semestres[] = {"Primero", "Segundo", "Tercero"};
    Spinner cmbLicenciaturas, cmbSemestres;
    String licenciatura, semestre;
    Button btnConfirmarRespuesta;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_add_cuestionario);
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);
        initComponents();
    }

    public void initComponents(){
        cmbLicenciaturas = findViewById(R.id.cmbLicenciaturas);
        ArrayAdapter<CharSequence> adapterLicenciaturas = new ArrayAdapter(this, android.R.layout.simple_spinner_item, licenciaturas);
        adapterLicenciaturas.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        cmbLicenciaturas.setAdapter(adapterLicenciaturas);
        cmbLicenciaturas.setOnItemSelectedListener(this);

        cmbSemestres = findViewById(R.id.cmbSemestres);
        ArrayAdapter<CharSequence> adapterSemestres = new ArrayAdapter(this, android.R.layout.simple_spinner_item, semestres);
        adapterSemestres.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        cmbSemestres.setAdapter(adapterSemestres);
        cmbSemestres.setOnItemSelectedListener(this);

        btnConfirmarRespuesta = findViewById(R.id.btnConfirmarRespuesta);

        listeners();
    }


    // OPCIONES SPINNER
    @Override
    public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {
        Spinner cmbLicenciaturas = (Spinner)parent;
        Spinner cmbSemestres = (Spinner)parent;
        if(cmbLicenciaturas.getId() == R.id.cmbLicenciaturas)
        {
            Toast.makeText(this, "Your choose :" + licenciaturas[position],Toast.LENGTH_SHORT).show();
            licenciatura = licenciaturas[position];
        }
        if(cmbSemestres.getId() == R.id.cmbSemestres)
        {
            Toast.makeText(this, "Your choose :" + semestres[position],Toast.LENGTH_SHORT).show();
            semestre = semestres[position];
        }
    }

    @Override
    public void onNothingSelected(AdapterView<?> parent) {

    }

    // EVENTOS BOTON CONFIRMAR
    public void listeners(){
        btnConfirmarRespuesta.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent addNewInfoCuestionario=new Intent(AddCuestionario.this, AddInfoCuestionario.class);
                startActivity(addNewInfoCuestionario);
            }
        });
    }


}
