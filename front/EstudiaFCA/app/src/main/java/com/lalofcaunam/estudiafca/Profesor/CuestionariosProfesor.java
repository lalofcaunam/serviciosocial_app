package com.lalofcaunam.estudiafca.Profesor;

import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.Menu;
import android.view.MenuItem;
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

import com.lalofcaunam.estudiafca.Alumno.CuestionariosAlumno;
import com.lalofcaunam.estudiafca.Login.LoginActivity;
import com.lalofcaunam.estudiafca.R;

import java.util.ArrayList;

public class CuestionariosProfesor extends AppCompatActivity {

    Button btnAddCuestionario;
    ListView listViewCP;
    String mTitulo[] = {"Cuestionario 1", "Cuestionario 2"};
    String mTema[] = {"Tema 1", "Tema 2"};

    TextView textCuestionariosProfesor;

    private SharedPreferences preferences, showBoarding;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_cuestionarios_profesor);
        initComponents();
    }

    public void initComponents() {
        textCuestionariosProfesor = findViewById(R.id.textCuestionariosProfesor);
        btnAddCuestionario = findViewById(R.id.btnAddCuestionario);
        listViewCP = findViewById(R.id.listview_cuestionarios_profesor);
        preferences = getSharedPreferences("Preferences", MODE_PRIVATE);
        showBoarding = getSharedPreferences("showBoarding", MODE_PRIVATE);
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
                    if(mTitulo[position].equals("Cuestionario 1")){
                        Intent cuestionarioProfesor = new Intent(CuestionariosProfesor.this, PreguntasCuestionario.class);
                        cuestionarioProfesor.putExtra("tituloCuestionario", mTitulo[position]);
                        cuestionarioProfesor.putExtra("activo", true);
                        startActivity(cuestionarioProfesor);
                    } else if (mTitulo[position].equals("Cuestionario 2")) {
                        Intent cuestionarioProfesor = new Intent(CuestionariosProfesor.this, PreguntasCuestionario.class);
                        cuestionarioProfesor.putExtra("tituloCuestionario", mTitulo[position]);
                        cuestionarioProfesor.putExtra("activo", false);
                        startActivity(cuestionarioProfesor);
                    }
                }
            });
        } else {
            textCuestionariosProfesor.setVisibility(View.VISIBLE);
        }
    }

    public boolean onCreateOptionsMenu(Menu menu){
        getMenuInflater().inflate(R.menu.menu, menu);
        return true;
    }

    public boolean onOptionsItemSelected(MenuItem item){
        int id = item.getItemId();

        if(id == R.id.item1){
            Toast.makeText(this, "Cerrando sesión", Toast.LENGTH_SHORT).show();
            logout();
        }

        return super.onOptionsItemSelected(item);
    }
    private void logout() {
        preferences.edit().clear().apply();
        //showBoarding.edit().clear().apply();
        startActivity(new Intent(CuestionariosProfesor.this, LoginActivity.class));
        finish();
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
            ImageButton btnOptionsCuestionarioAlumno = row.findViewById(R.id.btnOptionsCuestionarioAlumno);

            tituloCuestionario.setText(rTitulo[position]);
            temaCuestionario.setText(rTema[position]);

            btnOptionsCuestionarioAlumno.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    optionsCuestionario(rTitulo[position]);
                }
            });

            return row;
        }
    }

    public void optionsCuestionario(String titulo) {

        String[] options = {"Ver Historial", "Ver Preguntas", "Activar/Desactivar"};

        System.out.println(titulo);

        AlertDialog.Builder builder = new AlertDialog.Builder(CuestionariosProfesor.this);
        builder.setTitle("Selecciona una opcion");
        builder.setItems(options, new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialog, int which) {
                if ("Ver Historial".equals(options[which])) {
                    Intent historial = new Intent(CuestionariosProfesor.this, HistorialCuestionario.class);
                    startActivity(historial);
                } else if ("Ver Preguntas".equals(options[which])) {
                    if(titulo.equals("Cuestionario 1")){
                        Intent cuestionarioProfesor = new Intent(CuestionariosProfesor.this, PreguntasCuestionario.class);
                        cuestionarioProfesor.putExtra("tituloCuestionario", titulo);
                        cuestionarioProfesor.putExtra("activo", true);
                        startActivity(cuestionarioProfesor);
                    } else if (titulo.equals("Cuestionario 2")) {
                        Intent cuestionarioProfesor = new Intent(CuestionariosProfesor.this, PreguntasCuestionario.class);
                        cuestionarioProfesor.putExtra("tituloCuestionario", titulo);
                        cuestionarioProfesor.putExtra("activo", false);
                        startActivity(cuestionarioProfesor);
                    }
                } else if ("Activar/Desactivar".equals(options[which])) {
                    Toast.makeText(CuestionariosProfesor.this, options[which], Toast.LENGTH_SHORT).show();
                }
            }
        });

        builder.show();
    }

}
