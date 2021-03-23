package com.lalofcaunam.estudiafca.Profesor;

import android.content.DialogInterface;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Spinner;

import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;

import com.lalofcaunam.estudiafca.R;

public class AddPreguntaCuestionario extends AppCompatActivity implements AdapterView.OnItemSelectedListener {

    String respuestas[] = {"Selecciona una opcion", "Respuesta 1", "Respuesta 2", "Respuesta 3", "Respuesta 4"};
    Spinner respuestaCorrecta;

    EditText tituloPregunta, respuesta1, respuesta2, respuesta3, respuesta4, comentarioRespuesta1, comentarioRespuesta2, comentarioRespuesta3, comentarioRespuesta4;

    String respuesta, tPregunta, r1, r2, r3, r4, c1, c2, c3, c4;

    Button btnConfirmarPregunta;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_add_pregunta);
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);

        initComponents();
    }

    public void initComponents(){
        tituloPregunta = findViewById(R.id.tituloPregunta);
        respuesta1 = findViewById(R.id.respuesta1);
        respuesta2 = findViewById(R.id.respuesta2);
        respuesta3 = findViewById(R.id.respuesta3);
        respuesta4 = findViewById(R.id.respuesta4);

        comentarioRespuesta1 = findViewById(R.id.comentarioRespuesta1);
        comentarioRespuesta2 = findViewById(R.id.comentarioRespuesta2);
        comentarioRespuesta3 = findViewById(R.id.comentarioRespuesta3);
        comentarioRespuesta4 = findViewById(R.id.comentarioRespuesta4);

        btnConfirmarPregunta = findViewById(R.id.btnConfirmarPregunta);

        respuestaCorrecta = findViewById(R.id.respuestaCorrecta);
        ArrayAdapter<CharSequence> adapterRespuestas = new ArrayAdapter(this, android.R.layout.simple_spinner_item, respuestas);
        adapterRespuestas.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        respuestaCorrecta.setAdapter(adapterRespuestas);
        respuestaCorrecta.setOnItemSelectedListener(this);

        listeners();
    }

    public void listeners(){
        btnConfirmarPregunta.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                tPregunta = tituloPregunta.getText().toString().trim();
                r1 = respuesta1.getText().toString().trim();
                r2 = respuesta2.getText().toString().trim();
                r3 = respuesta3.getText().toString().trim();
                r4 = respuesta4.getText().toString().trim();

                c1 = comentarioRespuesta1.getText().toString();
                c2 = comentarioRespuesta2.getText().toString();
                c3 = comentarioRespuesta3.getText().toString();
                c4 = comentarioRespuesta4.getText().toString();

                if (tPregunta.isEmpty() || tPregunta.equals("")){
                    tituloPregunta.setFocusable(true);
                    tituloPregunta.setError("Campo Obligatorio");
                    alerta("No ha ingresado pregunta", "Por favor, ingrese una pregunta");
                } else if(r1.isEmpty() || r1.equals("")){
                    respuesta1.setFocusable(true);
                    respuesta1.setError("Campo Obligatorio");
                    alerta("No ha ingresado respuesta 1", "Por favor, ingrese la respuesta 1");
                } else if(c1.isEmpty() || c1.equals("")){
                    comentarioRespuesta1.setFocusable(true);
                    comentarioRespuesta1.setError("Campo Obligatorio");
                    alerta("No ha ingresado comentario", "Por favor, ingrese un comentario a la respuesta 1");
                } else if(r2.isEmpty() || r2.equals("")){
                    respuesta2.setFocusable(true);
                    respuesta2.setError("Campo Obligatorio");
                    alerta("No ha ingresado respuesta 2", "Por favor, ingrese la respuesta 2");
                } else if(c2.isEmpty() || c2.equals("")){
                    comentarioRespuesta2.setFocusable(true);
                    comentarioRespuesta2.setError("Campo Obligatorio");
                    alerta("No ha ingresado comentario", "Por favor, ingrese un comentario a la respuesta 2");
                }  else if(r3.isEmpty() || r3.equals("")){
                    respuesta3.setFocusable(true);
                    respuesta3.setError("Campo Obligatorio");
                    alerta("No ha ingresado respuesta 3", "Por favor, ingrese la respuesta 3");
                } else if(c3.isEmpty() || c3.equals("")){
                    comentarioRespuesta3.setFocusable(true);
                    comentarioRespuesta3.setError("Campo Obligatorio");
                    alerta("No ha ingresado comentario", "Por favor, ingrese un comentario a la respuesta 3");
                } else if(r4.isEmpty() || r4.equals("")){
                    respuesta4.setFocusable(true);
                    respuesta4.setError("Campo Obligatorio");
                    alerta("No ha ingresado respuesta 4", "Por favor, ingrese la respuesta 4");
                } else if(c4.isEmpty() || c4.equals("")){
                    comentarioRespuesta4.setFocusable(true);
                    comentarioRespuesta4.setError("Campo Obligatorio");
                    alerta("No ha ingresado comentario", "Por favor, ingrese un comentario a la respuesta 4");
                } else if(respuesta.equals("Selecciona una opcion")){
                    alerta("No ha seleccionado la respuesta correcta", "Por favor, seleccione la respuesta correcta");
                } else {
                    Intent preguntas = new Intent(AddPreguntaCuestionario.this, PreguntasCuestionario.class);
                    preguntas.putExtra("activo", true);
                    startActivity(preguntas);
                    finish();
                }
            }
        });
    }


    // OPCIONES SPINNER
    @Override
    public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {
        Spinner respuestaCorrecta = (Spinner)parent;
        if(respuestaCorrecta.getId() == R.id.respuestaCorrecta) {
            respuesta = respuestas[position];

            if(respuesta.equals("Respuesta 1")){
                c1 = "Correcta";
                comentarioRespuesta1.setText("Correcta");
                comentarioRespuesta1.setEnabled(false);
                comentarioRespuesta2.setText("");
                comentarioRespuesta2.setEnabled(true);
                comentarioRespuesta3.setText("");
                comentarioRespuesta3.setEnabled(true);
                comentarioRespuesta4.setText("");
                comentarioRespuesta4.setEnabled(true);
            } else if(respuesta.equals("Respuesta 2")){
                c2 = "Correcta";
                comentarioRespuesta1.setText("");
                comentarioRespuesta1.setEnabled(true);
                comentarioRespuesta2.setText("Correcta");
                comentarioRespuesta2.setEnabled(false);
                comentarioRespuesta3.setText("");
                comentarioRespuesta3.setEnabled(true);
                comentarioRespuesta4.setText("");
                comentarioRespuesta4.setEnabled(true);
            } else if(respuesta.equals("Respuesta 3")){
                c3 = "Correcta";
                comentarioRespuesta1.setText("");
                comentarioRespuesta1.setEnabled(true);
                comentarioRespuesta2.setText("");
                comentarioRespuesta2.setEnabled(true);
                comentarioRespuesta3.setText("Correcta");
                comentarioRespuesta3.setEnabled(false);
                comentarioRespuesta4.setText("");
                comentarioRespuesta4.setEnabled(true);
            } else if (respuesta.equals("Respuesta 4")){
                c4 = "Correcta";
                comentarioRespuesta1.setText("");
                comentarioRespuesta1.setEnabled(true);
                comentarioRespuesta2.setText("");
                comentarioRespuesta2.setEnabled(true);
                comentarioRespuesta3.setText("");
                comentarioRespuesta3.setEnabled(true);
                comentarioRespuesta4.setText("Correcta");
                comentarioRespuesta4.setEnabled(false);
            }

        }
    }

    @Override
    public void onNothingSelected(AdapterView<?> parent) {

    }

    public void alerta(String titulo, String mensaje){
        AlertDialog alertDialog = new AlertDialog.Builder(AddPreguntaCuestionario.this).create();
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
