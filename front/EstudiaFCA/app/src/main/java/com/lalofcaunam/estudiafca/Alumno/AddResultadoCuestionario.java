package com.lalofcaunam.estudiafca.Alumno;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;
import androidx.core.content.ContextCompat;
import androidx.viewpager2.widget.ViewPager2;

import com.google.android.material.button.MaterialButton;
import com.lalofcaunam.estudiafca.Login.LoginActivity;
import com.lalofcaunam.estudiafca.R;

import java.util.ArrayList;
import java.util.List;

public class AddResultadoCuestionario extends AppCompatActivity {

    private PreguntaAdapter preguntaAdapter;
    private MaterialButton btnConfirmarRespuesta;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_add_resultado_alumno);
        initComponents();
    }

    public void initComponents() {

        btnConfirmarRespuesta = findViewById(R.id.btnConfirmarRespuesta);
        setupPreguntaItems();

        ViewPager2 preguntaViewPager = findViewById(R.id.preguntaViewPager);
        preguntaViewPager.setAdapter(preguntaAdapter);

        setCurrentPreguntaIndicator(0);

        preguntaViewPager.registerOnPageChangeCallback(new ViewPager2.OnPageChangeCallback() {
            @Override
            public void onPageSelected(int position) {
                super.onPageSelected(position);
                setCurrentPreguntaIndicator(position);
            }
        });

        btnConfirmarRespuesta.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if(preguntaViewPager.getCurrentItem() + 1 < preguntaAdapter.getItemCount()){
                    preguntaViewPager.setCurrentItem(preguntaViewPager.getCurrentItem() + 1);
                } else {
                    Intent resultadoFinal = new Intent(AddResultadoCuestionario.this, ResultadosCuestionarioAlumno.class);
                    startActivity(resultadoFinal);
                }
            }
        });

    }

    public void setupPreguntaItems() {
        List<PreguntaItem> preguntaItemList = new ArrayList<>();

        PreguntaItem item = new PreguntaItem();
        item.setScore("00/03");
        item.setTextPregunta("Pregunta 1");

        PreguntaItem item2 = new PreguntaItem();
        item2.setScore("01/03");
        item2.setTextPregunta("Pregunta 2");

        PreguntaItem item3 = new PreguntaItem();
        item3.setScore("01/03");
        item3.setTextPregunta("Pregunta 3");

        preguntaItemList.add(item);
        preguntaItemList.add(item2);
        preguntaItemList.add(item3);

        preguntaAdapter = new PreguntaAdapter(preguntaItemList);
    }

    private void setCurrentPreguntaIndicator(int index){
        int childCount = preguntaAdapter.getItemCount();
        for(int i = 0; i < childCount; i++){
            if(index == preguntaAdapter.getItemCount() - 1){
                btnConfirmarRespuesta.setText("Finalizar");
            } else {
                btnConfirmarRespuesta.setText("Siguiente");
            }
        }
    }
}
