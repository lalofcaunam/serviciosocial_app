package com.lalofcaunam.estudiafca.Alumno;

import android.content.DialogInterface;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.RadioButton;
import android.widget.RadioGroup;
import android.widget.TextView;

import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;

import com.lalofcaunam.estudiafca.R;

public class Respuesta3 extends AppCompatActivity {

    TextView scoreP, textP;
    RadioGroup radioGroupRespuestas;
    RadioButton resp1, resp2, resp3, resp4;
    Button btnRespuesta;

    String respuesta3 = "";
    int score, fail;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.add_respuesta);

        Bundle bundle = getIntent().getExtras();
        score = bundle.getInt("score", 0);
        fail = bundle.getInt("fail", 0);

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

        scoreP.setText("0" + score + " / 03");

        btnRespuesta.setText("Finalizar");

        radioGroupRespuestas.setOnCheckedChangeListener(new RadioGroup.OnCheckedChangeListener() {
            @Override
            public void onCheckedChanged(RadioGroup group, int checkedId) {
                int idDeRadioButtonSeleccionado = group.getCheckedRadioButtonId();
                if (idDeRadioButtonSeleccionado == resp1.getId()) {
                    respuesta3 = resp1.getText().toString();
                    score++;
                    alerta("Respuesta Correcta","");
                } else if (idDeRadioButtonSeleccionado == resp2.getId()) {
                    respuesta3 = resp2.getText().toString();
                    fail++;
                    alerta("Respuesta Incorrecta","Comentario respuesta 2");
                } else if (idDeRadioButtonSeleccionado == resp3.getId()) {
                    respuesta3 = resp3.getText().toString();
                    fail++;
                    alerta("Respuesta Incorrecta","Comentario respuesta 3");
                }else if (idDeRadioButtonSeleccionado == resp4.getId()) {
                    respuesta3 = resp4.getText().toString();
                    fail++;
                    alerta("Respuesta Incorrecta","Comentario respuesta 4");
                } else {
                    respuesta3 = "";
                }
            }
        });

        listeners();
    }

    private void listeners(){
        btnRespuesta.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (respuesta3.equals("")){
                    alerta("No ha seleccionado una respuesta","Por favor, seleccione una respuesta");
                } else {
                    alertaFinalizado("Cuestionario Finalizado", "Resultados: \n Correctos: " + score + " \n Incorrectos: " + fail);
                }
            }
        });
    }

    private void alerta(String titulo, String mensaje){
        AlertDialog alertDialog = new AlertDialog.Builder(Respuesta3.this).create();
        alertDialog.setTitle(titulo);
        alertDialog.setMessage(mensaje);
        alertDialog.setButton(AlertDialog.BUTTON_POSITIVE, "OK",
                new DialogInterface.OnClickListener() {
                    public void onClick(DialogInterface dialog, int which) {
                        dialog.dismiss();
                    }
                });
        alertDialog.show();
    }

    private void alertaFinalizado(String titulo, String mensaje){
        AlertDialog alertDialog = new AlertDialog.Builder(Respuesta3.this).create();
        alertDialog.setTitle(titulo);
        alertDialog.setMessage(mensaje);
        alertDialog.setCancelable(false);
        alertDialog.setButton(AlertDialog.BUTTON_POSITIVE, "OK",
                new DialogInterface.OnClickListener() {
                    public void onClick(DialogInterface dialog, int which) {
                        Intent finalizar = new Intent(Respuesta3.this, ResultadosCuestionarioAlumno.class);
                        startActivity(finalizar);
                        dialog.dismiss();
                        finish();
                    }
                });
        alertDialog.show();
    }

}
