package com.lalofcaunam.estudiafca.Alumno;

import android.os.Bundle;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;

import com.lalofcaunam.estudiafca.R;

public class AddResultadoCuestionario extends AppCompatActivity {

    TextView textPregunta;
    String textoPregunta;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_add_resultado_alumno);

        initComponents();
    }

    public void initComponents() {
        Bundle extras = getIntent().getExtras();
        textoPregunta = extras.getString("textPregunta");

        textPregunta = findViewById(R.id.textPregunta);
        setData();
    }

    public void setData() {
        textPregunta.setText(textoPregunta);
    }
}
