package com.lalofcaunam.estudiafca.Profesor;

import android.content.DialogInterface;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.RadioButton;
import android.widget.RadioGroup;

import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;

import com.lalofcaunam.estudiafca.Login.LoginActivity;
import com.lalofcaunam.estudiafca.R;

public class AddInfoCuestionario extends AppCompatActivity {

    EditText tituloCuestionario, temaCuestionario, tiempoCuestionario;
    Button confirmInfoCuestionario;

    RadioGroup listAsignaturas;

    RadioButton textAsignatura1, textAsignatura2, textAsignatura3, textAsignatura4;

    private String titulo, tema, tiempo;
    String asignatura = "";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_add_info_cuestionario);
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);
        initComponents();
    }

    public void initComponents(){
        listAsignaturas = findViewById(R.id.listAsignaturas);
        textAsignatura1 = findViewById(R.id.textAsignatura1);
        textAsignatura2 = findViewById(R.id.textAsignatura2);
        textAsignatura3 = findViewById(R.id.textAsignatura3);
        textAsignatura4 = findViewById(R.id.textAsignatura4);


        listAsignaturas.setOnCheckedChangeListener(new RadioGroup.OnCheckedChangeListener() {
            @Override
            public void onCheckedChanged(RadioGroup group, int checkedId) {
                int idDeRadioButtonSeleccionado = group.getCheckedRadioButtonId();
                if (idDeRadioButtonSeleccionado == textAsignatura1.getId()) {
                    asignatura = textAsignatura1.getText().toString();
                } else if (idDeRadioButtonSeleccionado == textAsignatura2.getId()) {
                    asignatura = textAsignatura2.getText().toString();
                } else if (idDeRadioButtonSeleccionado == textAsignatura3.getId())  {
                    asignatura = textAsignatura3.getText().toString();
                } else if (idDeRadioButtonSeleccionado == textAsignatura4.getId()) {
                    asignatura = textAsignatura4.getText().toString();
                } else {
                    asignatura = "";
                }
            }
        });

        tituloCuestionario = findViewById(R.id.tituloCuestionario);
        temaCuestionario = findViewById(R.id.temaCuestionario);
        tiempoCuestionario = findViewById(R.id.tiempoCuestionario);
        confirmInfoCuestionario = findViewById(R.id.confirmInfoCuestionario);
        listeners();
    }

    public void listeners(){
        confirmInfoCuestionario.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                titulo = tituloCuestionario.getText().toString().trim();
                tema = temaCuestionario.getText().toString().trim();
                tiempo = tiempoCuestionario.getText().toString();

                if(asignatura.equals("")){
                    alerta("No ha seleccionado asignatura", "Por favor, seleccione una asignatura correspondiente al cuestionario");
                }else if(titulo.isEmpty() || titulo.equals("")){
                    tituloCuestionario.setError("Campo obligatorio");
                    tituloCuestionario.setFocusable(true);
                    alerta("No ha ingresado titulo", "Por favor, ingrese un titulo correspondiente al cuestionario");
                } else if (tema.isEmpty() || tema.equals("")){
                    temaCuestionario.setError("Campo obligatorio");
                    temaCuestionario.setFocusable(true);
                    alerta("No ha ingresado tema", "Por favor, ingrese un tema correspondiente al cuestionario");
                } else if (tiempo.isEmpty() || tiempo.equals("")){
                    tiempoCuestionario.setError("Campo obligatorio");
                    tiempoCuestionario.setFocusable(true);
                    alerta("No ha ingresado tiempo estimado", "Por favor, ingrese el tiempo estimado correspondiente al cuestionario");
                } else {
                    Intent cuestionarioProfesor = new Intent(AddInfoCuestionario.this, CuestionariosProfesor.class);
                    startActivity(cuestionarioProfesor);
                    finish();
                }
            }
        });
    }

    public void alerta(String titulo, String mensaje){
        AlertDialog alertDialog = new AlertDialog.Builder(AddInfoCuestionario.this).create();
        alertDialog.setTitle(titulo);
        alertDialog.setMessage(mensaje);
        alertDialog.setCancelable(false);
        alertDialog.setButton(AlertDialog.BUTTON_POSITIVE, "OK",
                new DialogInterface.OnClickListener() {
                    public void onClick(DialogInterface dialog, int which) {
                        dialog.dismiss();
                    }
                });
        alertDialog.show();
    }

}
