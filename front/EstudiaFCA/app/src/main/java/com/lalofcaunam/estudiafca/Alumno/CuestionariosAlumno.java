package com.lalofcaunam.estudiafca.Alumno;

import android.app.Dialog;
import android.content.Context;
import android.content.Intent;
import android.graphics.Color;
import android.graphics.drawable.ColorDrawable;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.ListView;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;

import com.lalofcaunam.estudiafca.Profesor.CuestionariosProfesor;
import com.lalofcaunam.estudiafca.R;

import java.util.ArrayList;
import java.util.List;

public class CuestionariosAlumno extends AppCompatActivity implements DialogInfoCuestionario.InfoCuestionario {

    DialogInfoCuestionario cuadroDialogoInfoCuestionario;
    ListView listView;
    TextView textCuestionariosAlumno;
    private ArrayList<String> tituloC = new ArrayList<String>();
    private ArrayList<String> temaC = new ArrayList<String>();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_cuestionarios_alumno);
        initComponents();
    }

    public void initComponents(){
        textCuestionariosAlumno = findViewById(R.id.textCuestionariosAlumno);
        listView = findViewById(R.id.listview_cuestionarios_alumno);

        tituloC.add("Cuestionario 1");
        tituloC.add("Cuestionario 2");

        temaC.add("Tema 1");
        temaC.add("Tema 2");

        getData();
    }

    public void getData() {
        if (tituloC.isEmpty()){
            textCuestionariosAlumno.setVisibility(View.VISIBLE);
        } else {
            textCuestionariosAlumno.setVisibility(View.GONE);

            CuestionariosAlumno.AdapterCuestionariosAlumno adapterCA = new CuestionariosAlumno.AdapterCuestionariosAlumno(this, tituloC, temaC);
            listView.setAdapter(adapterCA);

            listView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
                @Override
                public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                    Toast.makeText(CuestionariosAlumno.this, tituloC.get(position), Toast.LENGTH_SHORT).show();
                    if (tituloC.get(position).equals("Cuestionario 1")){
                        Intent resultadosCuestionarioAlumno = new Intent(CuestionariosAlumno.this, ResultadosCuestionarioAlumno.class);
                        resultadosCuestionarioAlumno.putExtra("tituloCuestionario", tituloC.get(position));
                        startActivity(resultadosCuestionarioAlumno);
                    } else {
                        Intent resultadosCuestionarioAlumno = new Intent(CuestionariosAlumno.this, ResultadoFinalAlumno.class);
                        resultadosCuestionarioAlumno.putExtra("tituloCuestionario", tituloC.get(position));
                        startActivity(resultadosCuestionarioAlumno);
                    }
                }
            });
        }

    }

    @Override
    public void infoCuestionario() {
    }

    // Adaptador de ListView

    class AdapterCuestionariosAlumno extends ArrayAdapter<String> {
        Context context;
        ArrayList<String> rTitulo = new ArrayList<String>();
        ArrayList<String> rTema = new ArrayList<String>();

        AdapterCuestionariosAlumno(Context c, List<String> titulo, List<String> tema){
            super(c, R.layout.row_cuestionarios_alumno, R.id.titulo_cuestionario, titulo);
            this.context = c;
            this.rTitulo = (ArrayList<String>) titulo;
            this.rTema = (ArrayList<String>) tema;
        }

        @NonNull
        @Override
        public View getView(int position, @Nullable View convertView, @NonNull ViewGroup parent) {
            LayoutInflater layoutInflater = (LayoutInflater)getApplicationContext().getSystemService(Context.LAYOUT_INFLATER_SERVICE);
            View row = layoutInflater.inflate(R.layout.row_cuestionarios_alumno, parent, false);
            TextView tituloCuestionario = row.findViewById(R.id.titulo_cuestionario);
            TextView temaCuestionario = row.findViewById(R.id.tema_cuestionario);
            Button btnInfoCuestionario = row.findViewById(R.id.btnInfoCuestionario);

            tituloCuestionario.setText(rTitulo.get(position));
            temaCuestionario.setText(rTema.get(position));

            btnInfoCuestionario.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    info(rTitulo.get(position), rTema.get(position));
                }
            });

            return row;
        }
    }

    private void info(String titulo, String tema) {
        cuadroDialogoInfoCuestionario = new DialogInfoCuestionario(this, CuestionariosAlumno.this, titulo, tema);
    }

}
