package com.lalofcaunam.estudiafca.Login;

import android.content.Intent;
import android.os.Bundle;
import android.text.Html;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;

import com.lalofcaunam.estudiafca.R;

public class SignupActivity extends AppCompatActivity {

    TextView labelClave;
    EditText editTextClave;

    String lClave, textInputClave, rol;

    Button btnRegistrar;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_signup);
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);

        initComponents();
    }

    public void initComponents() {
        Bundle extras = getIntent().getExtras();
        rol = extras.getString("rol");

        labelClave = findViewById(R.id.labelClave);
        editTextClave = findViewById(R.id.editTextClave);

        btnRegistrar = findViewById(R.id.btnRegistrar);

        getData();
        listeners();
    }

    public void getData(){
        if(rol.equals("alumno")){
            labelClave.setText("Número de Cuenta *");
            editTextClave.setHint("Ingresa número de cuenta");
        } else if (rol.equals("profesor")){
            labelClave.setText("Clave de Profesor *");
            editTextClave.setHint("Ingresa clave");
        }
    }

    public void listeners(){
        btnRegistrar.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                startActivity(new Intent(SignupActivity.this, EmailVerificationActivity.class));
            }
        });
    }
}
