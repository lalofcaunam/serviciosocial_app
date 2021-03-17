package com.lalofcaunam.estudiafca.Alumno;

import android.app.Dialog;
import android.content.Context;
import android.view.View;
import android.view.Window;
import android.widget.Button;
import android.widget.TextView;

import com.lalofcaunam.estudiafca.R;

import java.util.ArrayList;

public class DialogInfoCuestionario {

    public interface InfoCuestionario {
        void infoCuestionario();
    }

    private InfoCuestionario infoCuestionario;
    CuestionariosAlumno caActivity;

    public DialogInfoCuestionario(Context contexto, final CuestionariosAlumno actividad, String titulo, String temaCuestionario){

        infoCuestionario = (InfoCuestionario) actividad;

        final Dialog dialogo  = new Dialog(contexto);

        dialogo.requestWindowFeature(Window.FEATURE_NO_TITLE);
        dialogo.setCancelable(false);
        dialogo.setContentView(R.layout.info_pregunta_dialog);

        //Iniciando Vistas
        TextView nameCuestionario = dialogo.findViewById(R.id.nameCuestionario);
        TextView tema = dialogo.findViewById(R.id.tema);
        TextView asignatura = dialogo.findViewById(R.id.asignatura);
        TextView licenciatura = dialogo.findViewById(R.id.licenciatura);
        TextView semestre = dialogo.findViewById(R.id.semestre);
        TextView tiempo = dialogo.findViewById(R.id.tiempo);
        TextView fecha = dialogo.findViewById(R.id.fecha);
        TextView nombreProfesor = dialogo.findViewById(R.id.nombreProfesor);

        nameCuestionario.setText(titulo);
        tema.setText(temaCuestionario);


        final Button btnOkInfoPregunta = dialogo.findViewById(R.id.btnOkInfoPregunta);

        btnOkInfoPregunta.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                dialogo.dismiss();
            }
        });

        dialogo.show();
    }
}
