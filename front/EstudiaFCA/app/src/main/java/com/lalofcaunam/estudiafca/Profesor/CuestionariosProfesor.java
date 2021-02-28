package com.lalofcaunam.estudiafca.Profesor;

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

import com.lalofcaunam.estudiafca.Alumno.Cuestionarios;
import com.lalofcaunam.estudiafca.Alumno.CuestionariosAlumno;
import com.lalofcaunam.estudiafca.Alumno.ResultadoFinalAlumno;
import com.lalofcaunam.estudiafca.Alumno.ResultadosCuestionarioAlumno;
import com.lalofcaunam.estudiafca.R;

public class CuestionariosProfesor extends AppCompatActivity {

    Button btnAddCuestionario;
    ListView listViewCP;
    String mTitulo[] = {"Cuestionario 1", "Cuestionario 2"};
    String mTema[] = {"Tema 1", "Tema 2"};
    TextView textCuestionariosProfesor;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_cuestionarios_profesor);
        initComponents();
    }

    public void initComponents(){
        textCuestionariosProfesor = findViewById(R.id.textCuestionariosProfesor);
        btnAddCuestionario = findViewById(R.id.btnAddCuestionario);
        listViewCP = findViewById(R.id.listview_cuestionarios_profesor);
        getData();
        listeners();
    }

    public void listeners(){
        btnAddCuestionario.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent addNewCuestionario=new Intent(CuestionariosProfesor.this, AddCuestionario.class);
                startActivity(addNewCuestionario);
            }
        });
    }

    public void getData() {
        if (mTitulo.length > 0){
            textCuestionariosProfesor.setVisibility(View.GONE);
            CuestionariosProfesor.AdapterCuestionariosProfesor adapterCP = new CuestionariosProfesor.AdapterCuestionariosProfesor(this, mTitulo, mTema);
            listViewCP.setAdapter(adapterCP);

            listViewCP.setOnItemClickListener(new AdapterView.OnItemClickListener() {
                @Override
                public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                    Toast.makeText(CuestionariosProfesor.this, mTitulo[position], Toast.LENGTH_SHORT).show();
                    Intent cuestionarioProfesor = new Intent(CuestionariosProfesor.this, PreguntasCuestionario.class);
                    cuestionarioProfesor.putExtra("tituloCuestionario", mTitulo[position]);
                    startActivity(cuestionarioProfesor);
                }
            });
        } else {
            textCuestionariosProfesor.setVisibility(View.VISIBLE);
        }

    }



    // Adaptador de ListView

    class AdapterCuestionariosProfesor extends ArrayAdapter<String> {
        Context context;
        String rTitulo[];
        String rTema[];

        AdapterCuestionariosProfesor(Context c, String titulo[], String tema[]){
            super(c, R.layout.row_cuestionarios_profesor, R.id.titulo_cuestionario_profesor, titulo);
            this.context = c;
            this.rTitulo = titulo;
            this.rTema = tema;
        }

        @NonNull
        @Override
        public View getView(int position, @Nullable View convertView, @NonNull ViewGroup parent) {
            LayoutInflater layoutInflater = (LayoutInflater)getApplicationContext().getSystemService(Context.LAYOUT_INFLATER_SERVICE);
            View row = layoutInflater.inflate(R.layout.row_cuestionarios_profesor, parent, false);
            TextView tituloCuestionario = row.findViewById(R.id.titulo_cuestionario_profesor);
            TextView temaCuestionario = row.findViewById(R.id.tema_cuestionario_profesor);

            tituloCuestionario.setText(rTitulo[position]);
            temaCuestionario.setText(rTema[position]);

            return row;
        }
    }

}
