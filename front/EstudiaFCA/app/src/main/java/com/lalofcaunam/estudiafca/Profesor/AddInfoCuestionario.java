package com.lalofcaunam.estudiafca.Profesor;

import android.os.Bundle;

import androidx.appcompat.app.AppCompatActivity;

import com.lalofcaunam.estudiafca.R;

public class AddInfoCuestionario extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_add_info_cuestionario);
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);
        initComponents();
    }

    public void initComponents(){

    }

}
