package com.lalofcaunam.estudiafca.Login;

import android.content.DialogInterface;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;

import com.lalofcaunam.estudiafca.API.JsonApi;
import com.lalofcaunam.estudiafca.Modelos.Alumno;
import com.lalofcaunam.estudiafca.Modelos.Profesor;
import com.lalofcaunam.estudiafca.Modelos.ResultResponse;
import com.lalofcaunam.estudiafca.R;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;


public class SignupActivity extends AppCompatActivity {

    TextView labelClave;
    EditText editTextClave, editTextNombre, editTextAPaterno, editTextAMaterno, editTextCorreoCuenta, editTextPasswordCuenta, editTextConfirmPasswordCuenta;

    String lClave, textInputClave, rol, clave, nombre, apellidoPaterno, apellidoMaterno, correo, contrasenia, confirmContrasenia;

    String emailPattern = "[a-zA-Z0-9._-]+@[a-z]+\\.+[a-z]+";

    Button btnRegistrar;

    private JsonApi jsonApi;

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

        editTextNombre = findViewById(R.id.editTextNombre);
        editTextAPaterno = findViewById(R.id.editTextAPaterno);
        editTextAMaterno = findViewById(R.id.editTextAMaterno);
        editTextCorreoCuenta = findViewById(R.id.editTextCorreoCuenta);
        editTextPasswordCuenta = findViewById(R.id.editTextPasswordCuenta);
        editTextConfirmPasswordCuenta = findViewById(R.id.editTextConfirmPasswordCuenta);

        btnRegistrar = findViewById(R.id.btnRegistrar);

        getData();
        listeners();
    }

    public void getData(){

        if(rol.equals("Alumno")){
            labelClave.setText("Número de Cuenta *");
            editTextClave.setHint("Ingresa número de cuenta");
        } else if (rol.equals("Profesor")){
            labelClave.setText("Clave de Profesor *");
            editTextClave.setHint("Ingresa clave");
        }

    }

    public void listeners(){
        btnRegistrar.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                nombre = editTextNombre.getText().toString().trim();
                apellidoPaterno = editTextAPaterno.getText().toString().trim();
                apellidoMaterno = editTextAMaterno.getText().toString().trim();
                correo = editTextCorreoCuenta.getText().toString().trim();
                contrasenia = editTextPasswordCuenta.getText().toString().trim();
                clave = editTextClave.getText().toString().trim();
                confirmContrasenia = editTextConfirmPasswordCuenta.getText().toString().trim();

                if (nombre.equals("") || nombre.isEmpty()){
                    editTextNombre.setError("Campo obligatorio");
                    editTextNombre.setFocusable(true);
                    alertaFormulario("Falta Nombre", "Por favor, ingresa tu nombre");
                } else if (apellidoPaterno.equals("") || apellidoPaterno.isEmpty()){
                    editTextAPaterno.setError("Campo obligatorio");
                    editTextAPaterno.setFocusable(true);
                    alertaFormulario("Falta Apellido Paterno", "Por favor, ingresa tu apellido paterno");
                } else if (clave.equals("") || clave.isEmpty()){
                    editTextClave.setError("Campo obligatorio");
                    editTextClave.setFocusable(true);
                    if(rol.equals("Profesor")){
                        alertaFormulario("Falta Clave", "Por favor, ingresa tu clave");
                    } else if (rol.equals("Alumno")){
                        alertaFormulario("Falta Número de Cuenta", "Por favor, ingresa tu número de cuenta");
                    }
                } else if (correo.equals("") || correo.isEmpty()){
                    editTextCorreoCuenta.setError("Campo obligatorio");
                    editTextCorreoCuenta.setFocusable(true);
                    alertaFormulario("Falta Correo Electrónico", "Por favor, ingresa tu correo electrónico");
                } else if (!correo.matches(emailPattern)) {
                    editTextCorreoCuenta.setError("Ingresa un correo válido");
                    editTextCorreoCuenta.setFocusable(true);
                    alertaFormulario("Correo Electrónico Erróneo", "Por favor, ingresa una dirección correo electrónico válido");
                } else if (contrasenia.equals("") || contrasenia.isEmpty()) {
                    editTextPasswordCuenta.setError("Campo obligatorio");
                    editTextPasswordCuenta.setFocusable(true);
                    alertaFormulario("Falta Contraseña", "Por favor, ingresa una contraseña");
                } else if (!contrasenia.equals(confirmContrasenia)){
                    editTextConfirmPasswordCuenta.setError("Las contraseñas no coinciden");
                    editTextPasswordCuenta.setError("Las contraseñas no coinciden");
                    editTextConfirmPasswordCuenta.setFocusable(true);
                    alertaFormulario("Las contraseñas no coinciden", "Por favor, verifica que tu contraseña sea la misma");
                } else {

                    Retrofit retrofit = new Retrofit.Builder()
                            .baseUrl("https://serviciosocial-backend.mybluemix.net/ssfca/api/v1/")
                            .addConverterFactory(GsonConverterFactory.create())
                            .build();

                    jsonApi = retrofit.create(JsonApi.class);

                    if(rol.equals("Alumno")){
                        registerAlumno();
                    } else if (rol.equals("Profesor")){
                        registerProfesor();
                    }
                }
            }
        });
    }

    private void registerAlumno(){
        Alumno alumno = new Alumno(nombre, apellidoPaterno, apellidoMaterno, correo, contrasenia, clave, rol);
        Call<ResultResponse> registerA = jsonApi.registerAlumno(alumno);

        registerA.enqueue(new Callback<ResultResponse>() {
            @Override
            public void onResponse(Call<ResultResponse> call, Response<ResultResponse> response) {
                if (!response.isSuccessful()){
                    System.out.println(response.code() + "\n");
                    System.out.println(response.message() + "\n");

                    if(response.code() == 400){
                        editTextCorreoCuenta.setFocusable(true);
                        editTextCorreoCuenta.setError("");
                        alertaRegistroError("Ocurrió un error", "Ya existe un usuario registrado con ese correo" );
                    } else {
                        alertaRegistroError("Ocurrió un error", "Favor de intentar más tarde" );
                    }

                    return;
                }

                System.out.println("Codigo: " + response.code() + "\n");
                System.out.println("Mensaje: " + response.message() + "\n");
                alertaRegistroExitoso("Registro exitoso", "Usuario registrado correctamente");
            }

            @Override
            public void onFailure(Call<ResultResponse> call, Throwable t) {

            }
        });
    }

    private void registerProfesor(){

        Profesor profesor = new Profesor(nombre, apellidoPaterno, apellidoMaterno, correo, contrasenia, clave, rol);
        Call<ResultResponse> registerP = jsonApi.registerProfesor(profesor);

        registerP.enqueue(new Callback<ResultResponse>() {
            @Override
            public void onResponse(Call<ResultResponse> call, Response<ResultResponse> response) {
                if (!response.isSuccessful()){
                    System.out.println(response.code() + "\n");
                    System.out.println(response.message() + "\n");

                    if(response.code() == 400){
                        editTextCorreoCuenta.setFocusable(true);
                        editTextCorreoCuenta.setError("");
                        alertaRegistroError("Ocurrió un error", "Ya existe un usuario registrado con ese correo" );
                    } else {
                        alertaRegistroError("Ocurrió un error", "Favor de intentar más tarde" );
                    }

                    return;
                }

                System.out.println("Codigo: " + response.code() + "\n");
                System.out.println("Mensaje: " + response.message() + "\n");
                alertaRegistroExitoso("Registro exitoso", "Usuario registrado correctamente");
            }

            @Override
            public void onFailure(Call<ResultResponse> call, Throwable t) {

            }
        });
    }

    public void alertaRegistroExitoso(String titulo, String mensaje){
        AlertDialog alertDialog = new AlertDialog.Builder(SignupActivity.this).create();
        alertDialog.setTitle(titulo);
        alertDialog.setMessage(mensaje);
        alertDialog.setCancelable(false);
        alertDialog.setButton(AlertDialog.BUTTON_POSITIVE, "OK",
                new DialogInterface.OnClickListener() {
                    public void onClick(DialogInterface dialog, int which) {
                        dialog.dismiss();
                        Intent emailVerification = new Intent(SignupActivity.this, EmailVerificationActivity.class);
                        emailVerification.putExtra("correo", correo);
                        startActivity(emailVerification);
                        finish();
                    }
                });
        alertDialog.show();
    }

    public void alertaRegistroError(String titulo, String mensaje){
        AlertDialog alertDialog = new AlertDialog.Builder(SignupActivity.this).create();
        alertDialog.setTitle(titulo);
        alertDialog.setMessage(mensaje);
        alertDialog.setCancelable(false);
        alertDialog.setButton(AlertDialog.BUTTON_POSITIVE, "OK",
                new DialogInterface.OnClickListener() {
                    public void onClick(DialogInterface dialog, int which) {
                        dialog.dismiss();
                    }
                });
        alertDialog.show();
    }

    public void alertaFormulario(String titulo, String mensaje){
        AlertDialog alertDialog = new AlertDialog.Builder(SignupActivity.this).create();
        alertDialog.setTitle(titulo);
        alertDialog.setMessage(mensaje);
        alertDialog.setButton(AlertDialog.BUTTON_POSITIVE, "OK",
                new DialogInterface.OnClickListener() {
                    public void onClick(DialogInterface dialog, int which) {
                        dialog.dismiss();
                    }
                });
        alertDialog.show();
    }
}