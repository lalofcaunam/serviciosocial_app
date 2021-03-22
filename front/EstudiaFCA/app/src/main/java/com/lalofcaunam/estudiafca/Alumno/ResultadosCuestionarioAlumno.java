package com.lalofcaunam.estudiafca.Alumno;

import android.content.Context;
import android.content.Intent;
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

import com.lalofcaunam.estudiafca.R;

import java.util.ArrayList;
import java.util.List;

public class ResultadosCuestionarioAlumno extends AppCompatActivity {

    TextView textResultadoCuestionariosAlumno;
    Button btnAddResultadoCuestionarioAlumno;
    ListView resultadoListView;
    private ArrayList<String> tituloResultado = new ArrayList<String>();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_resultados_cuestionario_alumno);
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);
        initComponents();
    }

    public void initComponents() {

        textResultadoCuestionariosAlumno = findViewById(R.id.textResultadoCuestionariosAlumno);
        resultadoListView = findViewById(R.id.listview_resultado);
        btnAddResultadoCuestionarioAlumno = findViewById(R.id.btnAddResultadoCuestionarioAlumno);

        tituloResultado.add("Resultado 1");

        setData();
        listener();
    }

    public void setData(){
        if(tituloResultado.isEmpty()){
            textResultadoCuestionariosAlumno.setVisibility(View.VISIBLE);
        } else {
            textResultadoCuestionariosAlumno.setVisibility(View.GONE);

            ResultadosCuestionarioAlumno.AdapterResultados adapterR = new ResultadosCuestionarioAlumno.AdapterResultados(this, tituloResultado);
            resultadoListView.setAdapter(adapterR);

            resultadoListView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
                @Override
                public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                    Intent resultadoFinal = new Intent(ResultadosCuestionarioAlumno.this, ResultadoFinalAlumno.class);
                    startActivity(resultadoFinal);
                }
            });
        }
    }

    public void listener(){
        btnAddResultadoCuestionarioAlumno.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent addResultadoAlumno = new Intent(ResultadosCuestionarioAlumno.this, Respuesta1.class);
                startActivity(addResultadoAlumno);
            }
        });
    }

    // Adaptador de ListView
    class AdapterResultados extends ArrayAdapter<String> {
        Context context;
        ArrayList<String> rTitulo = new ArrayList<String>();

        AdapterResultados(Context c, List<String> titulo){
            super(c, R.layout.row_resultado, R.id.textResultadoRespuestas, titulo);
            this.context = c;
            this.rTitulo = (ArrayList<String>) titulo;
        }

        @NonNull
        @Override
        public View getView(int position, @Nullable View convertView, @NonNull ViewGroup parent) {
            LayoutInflater layoutInflater = (LayoutInflater)getApplicationContext().getSystemService(Context.LAYOUT_INFLATER_SERVICE);
            View row = layoutInflater.inflate(R.layout.row_resultado, parent, false);
            TextView textResultadoRespuestas = row.findViewById(R.id.textResultadoRespuestas);

            textResultadoRespuestas.setText(rTitulo.get(position));

            return row;
        }
    }
}
