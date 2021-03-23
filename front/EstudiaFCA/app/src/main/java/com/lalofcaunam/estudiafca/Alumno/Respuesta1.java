package com.lalofcaunam.estudiafca.Alumno;

import android.content.DialogInterface;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.RadioButton;
import android.widget.RadioGroup;
import android.widget.TextView;
import android.widget.Toast;

import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;

import com.lalofcaunam.estudiafca.Profesor.CuestionariosProfesor;
import com.lalofcaunam.estudiafca.R;

public class Respuesta1 extends AppCompatActivity {

    TextView scoreP, textP;
    RadioGroup radioGroupRespuestas;
    RadioButton resp1, resp2, resp3, resp4;
    Button btnRespuesta, btnCancelar;

    String respuesta1 = "";
    int score = 0;
    int fail = 0;

    Boolean isCorrecta;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.add_respuesta);

        initComponents();
    }

    private void initComponents(){
        scoreP = findViewById(R.id.scoreP);
        textP = findViewById(R.id.textP);

        radioGroupRespuestas = findViewById(R.id.radioGroupRespuestas);
        resp1 = findViewById(R.id.resp1);
        resp2 = findViewById(R.id.resp2);
        resp3 = findViewById(R.id.resp3);
        resp4 = findViewById(R.id.resp4);

        btnRespuesta = findViewById(R.id.btnRespuesta);
        btnCancelar = findViewById(R.id.btnCancelar);

        btnRespuesta.setText("Siguiente");

        radioGroupRespuestas.setOnCheckedChangeListener(new RadioGroup.OnCheckedChangeListener() {
            @Override
            public void onCheckedChanged(RadioGroup group, int checkedId) {
                int idDeRadioButtonSeleccionado = group.getCheckedRadioButtonId();
                if (idDeRadioButtonSeleccionado == resp1.getId()) {
                    respuesta1 = resp1.getText().toString();
                    isCorrecta = true;
                    resetScore();
                    score++;
                } else if (idDeRadioButtonSeleccionado == resp2.getId()) {
                    respuesta1 = resp2.getText().toString();
                    resetFail();
                    isCorrecta = false;
                    fail++;
                } else if (idDeRadioButtonSeleccionado == resp3.getId()) {
                    respuesta1 = resp3.getText().toString();
                    resetFail();
                    fail++;
                    isCorrecta = false;
                }else if (idDeRadioButtonSeleccionado == resp4.getId()) {
                    respuesta1 = resp4.getText().toString();
                    resetFail();
                    fail++;
                    isCorrecta = false;
                } else {
                    score = 0;
                    fail = 0;
                    respuesta1 = "";
                }
            }
        });

        listeners();
    }

    public void resetScore(){
        score = 0;
    }

    public void resetFail(){
        fail = 0;
    }

    private void listeners(){

        btnCancelar.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                alertaCancelar("¿Desea cancelar el cuetionario?", "Una vez cancelado se perderán sus respuestas");
            }
        });

        btnRespuesta.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (respuesta1.equals("")){
                    alertaNoSeleccion("No ha seleccionado una respuesta","Por favor, seleccione una respuesta");
                } else {
                    if (isCorrecta){
                        alerta("Respuesta correcta", "");
                    } else {
                        alerta("Respuesta Incorrecta", "Comentario respuesta incorrecta");
                    }
                }
            }
        });
    }

    private void alerta(String titulo, String mensaje){
        AlertDialog alertDialog = new AlertDialog.Builder(Respuesta1.this).create();
        alertDialog.setTitle(titulo);
        alertDialog.setMessage(mensaje);
        alertDialog.setCancelable(false);
        alertDialog.setButton(AlertDialog.BUTTON_POSITIVE, "OK",
                new DialogInterface.OnClickListener() {
                    public void onClick(DialogInterface dialog, int which) {
                        Intent respuestaSiguiente = new Intent(Respuesta1.this, Respuesta2.class);
                        respuestaSiguiente.putExtra("score", score);
                        respuestaSiguiente.putExtra("fail", fail);
                        startActivity(respuestaSiguiente);
                        finish();
                        dialog.dismiss();
                    }
                });
        alertDialog.show();
    }

    private void alertaNoSeleccion(String titulo, String mensaje){
        AlertDialog alertDialog = new AlertDialog.Builder(Respuesta1.this).create();
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

    private void alertaCancelar(String titulo, String mensaje){
        AlertDialog alertDialog = new AlertDialog.Builder(Respuesta1.this).create();
        alertDialog.setTitle(titulo);
        alertDialog.setMessage(mensaje);
        alertDialog.setCancelable(false);
        alertDialog.setButton(AlertDialog.BUTTON_NEGATIVE, "No", new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialog, int which) {
                dialog.dismiss();
            }
        });
        alertDialog.setButton(AlertDialog.BUTTON_POSITIVE, "Si, Cancelar",
                new DialogInterface.OnClickListener() {
                    public void onClick(DialogInterface dialog, int which) {
                        Intent cancelarCuestionario = new Intent(Respuesta1.this, ResultadosCuestionarioAlumno.class);
                        startActivity(cancelarCuestionario);
                        finish();
                        dialog.dismiss();
                    }
                });
        alertDialog.show();
    }

}
