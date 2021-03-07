package com.lalofcaunam.estudiafca.Profesor;

import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.ImageButton;
import android.widget.ListView;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;

import com.lalofcaunam.estudiafca.R;

public class PreguntasCuestionario extends AppCompatActivity {

    TextView textListaPreguntas;
    ListView listViewPreguntas;
    String mTitulo[] = {"Pregunta 1", "Pregunta 2"};
    Button btnAddPregunta;
    Boolean isActive;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_pregunta_profesor);
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);
        initComponents();
    }

    public void initComponents(){
        Bundle extras = getIntent().getExtras();
        isActive = extras.getBoolean("activo");
        textListaPreguntas = findViewById(R.id.textListaPreguntas);
        btnAddPregunta = findViewById(R.id.btnAddPregunta);
        if (!isActive) {
            btnAddPregunta.setVisibility(View.GONE);
        }
        listViewPreguntas = findViewById(R.id.list_preguntas_cuestionario);
        getData();
        listeners();
    }

    public void listeners(){
        btnAddPregunta.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent addNewPregunta=new Intent(PreguntasCuestionario.this, AddPreguntaCuestionario.class);
                startActivity(addNewPregunta);
            }
        });
    }


    public void getData() {
        if (mTitulo.length > 0){
            textListaPreguntas.setVisibility(View.GONE);
            PreguntasCuestionario.AdapterPregunta adapterP = new PreguntasCuestionario.AdapterPregunta(this, mTitulo);
            listViewPreguntas.setAdapter(adapterP);

            listViewPreguntas.setOnItemClickListener(new AdapterView.OnItemClickListener() {
                @Override
                public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                    Toast.makeText(PreguntasCuestionario.this, mTitulo[position], Toast.LENGTH_SHORT).show();
                }
            });
        } else {
            textListaPreguntas.setVisibility(View.VISIBLE);
        }
    }

    // Adaptador de ListView

    class AdapterPregunta extends ArrayAdapter<String> {
        Context context;
        String rTitulo[];

        AdapterPregunta(Context c, String titulo[]){
            super(c, R.layout.row_pregunta, R.id.titulo_pregunta, titulo);
            this.context = c;
            this.rTitulo = titulo;
        }

        @NonNull
        @Override
        public View getView(int position, @Nullable View convertView, @NonNull ViewGroup parent) {
            LayoutInflater layoutInflater = (LayoutInflater)getApplicationContext().getSystemService(Context.LAYOUT_INFLATER_SERVICE);
            View row = layoutInflater.inflate(R.layout.row_pregunta, parent, false);
            TextView tituloPregunta = row.findViewById(R.id.titulo_pregunta);
            ImageButton btnDeletePregunta = row.findViewById(R.id.btnDeletePregunta);

            if (!isActive) {
                btnDeletePregunta.setVisibility(View.GONE);
            }

            tituloPregunta.setText(rTitulo[position]);

            btnDeletePregunta.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    deletePregunta();
                }
            });

            return row;
        }
    }

    private void deletePregunta() {
        AlertDialog.Builder builder = new AlertDialog.Builder(PreguntasCuestionario.this);
        builder.setTitle("¿Deseas eliminar esta pregunta?");
        builder.setMessage("¿Estas seguro de que deseas eliminar esta pregunta?, Una vez borrada no se podrá recuperar");
        builder.setIcon(R.drawable.ic_baseline_delete_24);
        builder.setPositiveButton("Si, borrar", new DialogInterface.OnClickListener() {
            public void onClick(DialogInterface dialog, int id) {
                dialog.dismiss();
            }
        });
        builder.setNegativeButton("No", new DialogInterface.OnClickListener() {
            public void onClick(DialogInterface dialog, int id) {
                dialog.dismiss();
            }
        });
        AlertDialog alert = builder.create();
        alert.show();
    }

}