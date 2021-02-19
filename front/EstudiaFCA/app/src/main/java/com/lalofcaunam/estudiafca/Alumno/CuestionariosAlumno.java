package com.lalofcaunam.estudiafca.Alumno;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.ListView;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;

import com.lalofcaunam.estudiafca.R;

public class CuestionariosAlumno extends AppCompatActivity {

    ListView listView;
    TextView textCuestionariosAlumno;
    String mTitulo[] = {"Cuestionario 1", "Cuestionario 2"};
    String mTema[] = {"Tema 1", "Tema 2"};

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_cuestionarios_alumno);

        initComponents();
    }

    public void initComponents(){
        textCuestionariosAlumno = findViewById(R.id.textCuestionariosAlumno);
        listView = findViewById(R.id.listview_cuestionarios_alumno);

        getData();
    }

    public void getData() {
        if (mTitulo.length > 0){
            textCuestionariosAlumno.setVisibility(View.GONE);
            MyAdapter adapter = new MyAdapter(this, mTitulo, mTema);
            listView.setAdapter(adapter);

            listView.setOnItemClickListener(new AdapterView.OnItemClickListener() {
                @Override
                public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                    Toast.makeText(CuestionariosAlumno.this, mTitulo[position], Toast.LENGTH_SHORT).show();
                    Intent resultadosCuestionarioAlumno = new Intent(CuestionariosAlumno.this, ResultadosCuestionarioAlumno.class);
                    resultadosCuestionarioAlumno.putExtra("tituloCuestionario", mTitulo[position]);
                    startActivity(resultadosCuestionarioAlumno);
                }
            });
        } else {
            textCuestionariosAlumno.setVisibility(View.VISIBLE);
        }

    }

    // Adaptador de ListView

    class MyAdapter extends ArrayAdapter<String> {
        Context context;
        String rTitulo[];
        String rTema[];

        MyAdapter(Context c, String titulo[], String tema[]){
            super(c, R.layout.row_cuestionarios_alumno, R.id.titulo_cuestionario, titulo);
            this.context = c;
            this.rTitulo = titulo;
            this.rTema = tema;
        }

        @NonNull
        @Override
        public View getView(int position, @Nullable View convertView, @NonNull ViewGroup parent) {
            LayoutInflater layoutInflater = (LayoutInflater)getApplicationContext().getSystemService(Context.LAYOUT_INFLATER_SERVICE);
            View row = layoutInflater.inflate(R.layout.row_cuestionarios_alumno, parent, false);
            TextView tituloCuestionario = row.findViewById(R.id.titulo_cuestionario);
            TextView temaCuestionario = row.findViewById(R.id.tema_cuestionario);

            tituloCuestionario.setText(rTitulo[position]);
            temaCuestionario.setText(rTema[position]);

            return row;
        }
    }

}
