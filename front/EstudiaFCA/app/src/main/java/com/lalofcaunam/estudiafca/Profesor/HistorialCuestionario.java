package com.lalofcaunam.estudiafca.Profesor;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.ImageButton;
import android.widget.ListView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;

import com.lalofcaunam.estudiafca.R;

public class HistorialCuestionario extends AppCompatActivity {

    ListView listViewH;
    String mIntentos[] = {"02/04", "01/04"};
    String mFechas[] = {"01/12/2020", "20/02/2021"};

    TextView textHistorial;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_historial_cuestionario);
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);

        initComponents();
    }

    public void initComponents(){
        listViewH = findViewById(R.id.listview_historial);
        textHistorial = findViewById(R.id.textHistorial);
        getData();
    }

    public void getData(){
        if (mIntentos.length > 0){
            textHistorial.setVisibility(View.GONE);
            HistorialCuestionario.AdapterHistorial adapterH = new HistorialCuestionario.AdapterHistorial(this, mIntentos, mFechas);
            listViewH.setAdapter(adapterH);
            listViewH.setOnItemClickListener(new AdapterView.OnItemClickListener() {
                @Override
                public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                    Intent infoHistorial = new Intent(HistorialCuestionario.this, InfoHistorial.class);
                    infoHistorial.putExtra("intentos", mIntentos[position]);
                    startActivity(infoHistorial);
                }
            });
        } else {
            textHistorial.setVisibility(View.VISIBLE);
        }
    }

    // Adaptador de ListView
    class AdapterHistorial extends ArrayAdapter<String> {
        Context context;
        String rIntento[];
        String rFecha[];

        AdapterHistorial(Context c, String intento[], String fecha[]){
            super(c, R.layout.row_historial, R.id.intentos, intento);
            this.context = c;
            this.rIntento = intento;
            this.rFecha = fecha;
        }

        @NonNull
        @Override
        public View getView(int position, @Nullable View convertView, @NonNull ViewGroup parent) {
            LayoutInflater layoutInflater = (LayoutInflater)getApplicationContext().getSystemService(Context.LAYOUT_INFLATER_SERVICE);
            View row = layoutInflater.inflate(R.layout.row_historial, parent, false);
            TextView intentos = row.findViewById(R.id.intentos);
            TextView fecha_intento = row.findViewById(R.id.fecha_intento);

            intentos.setText(rIntento[position]);
            fecha_intento.setText(rFecha[position]);

            return row;
        }
    }

}
