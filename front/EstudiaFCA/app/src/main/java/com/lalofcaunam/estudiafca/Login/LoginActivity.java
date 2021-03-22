package com.lalofcaunam.estudiafca.Login;

import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;

import android.content.DialogInterface;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;

import com.auth0.android.jwt.JWT;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.lalofcaunam.estudiafca.API.JsonApi;
import com.lalofcaunam.estudiafca.Alumno.CuestionariosAlumno;
import com.lalofcaunam.estudiafca.Modelos.Login;
import com.lalofcaunam.estudiafca.Modelos.ResultResponse;
import com.lalofcaunam.estudiafca.OnBoarding.MainActivity;
import com.lalofcaunam.estudiafca.Profesor.CuestionariosProfesor;
import com.lalofcaunam.estudiafca.R;

import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Nullable;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.HashMap;
import java.util.Map;

import okhttp3.MediaType;
import okhttp3.ResponseBody;
import okio.BufferedSource;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class LoginActivity extends AppCompatActivity {

    Button btnIniciarSesion, btnRegistrarse, btnOlvidoContraseña;
    EditText editTextCorreo, editTextPassword;
    String correo, password, token;

    String emailPattern = "[a-zA-Z0-9._-]+@[a-z]+\\.+[a-z]+";

    Boolean isFirst;

    private JsonApi jsonApi;

    private SharedPreferences preferences, showBoarding;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        initComponents();
    }


    public void initComponents() { // Funcion que inicia los componentes de la vista activity_login
        // Inputs
        editTextCorreo = findViewById(R.id.editTextCorreo);
        editTextPassword = findViewById(R.id.editTextPassword);

        // Botones
        btnIniciarSesion = findViewById(R.id.btnIniciarSesion);
        btnRegistrarse = findViewById(R.id.btnRegistrarse);
        btnOlvidoContraseña = findViewById(R.id.btnOlvidoContraseña);

        //Preferences
        preferences = getSharedPreferences("Preferences", MODE_PRIVATE);
        showBoarding = getSharedPreferences("showBoarding", MODE_PRIVATE);

        // Listeners
        listeners();
    }


    public void listeners () { // Funcion que inicia acciones listener de eventos

        btnIniciarSesion.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                correo = editTextCorreo.getText().toString().trim();
                password = editTextPassword.getText().toString().trim();
                if(validacionesLogin(correo, password)) {
                    SharedPreferences.Editor editor = preferences.edit();
                    if(correo.equals("profesor@profesor.com") && password.equals("profesor")){
                        editor.putBoolean("isLogin", true);
                        editor.putString("rol", "profesor");
                        editor.apply();

                        isFirst = showBoarding.getBoolean("isFirst", true);

                        if(isFirst){
                            Intent cuestionariosProfesor=new Intent(LoginActivity.this, MainActivity.class);
                            cuestionariosProfesor.putExtra("rol", "profesor");
                            startActivity(cuestionariosProfesor);
                        } else {
                            Intent cuestionariosProfesor=new Intent(LoginActivity.this, CuestionariosProfesor.class);
                            startActivity(cuestionariosProfesor);
                        }

                    } else if (correo.equals("alumno@alumno.com") && password.equals("alumno")) {
                        editor.putBoolean("isLogin", true);
                        editor.putString("rol", "alumno");
                        editor.apply();

                        isFirst = showBoarding.getBoolean("isFirst", true);

                        if(isFirst){
                            Intent cuestionariosAlumno=new Intent(LoginActivity.this, MainActivity.class);
                            cuestionariosAlumno.putExtra("rol", "alumno");
                            startActivity(cuestionariosAlumno);
                        } else {
                            Intent cuestionariosAlumno=new Intent(LoginActivity.this, CuestionariosAlumno.class);
                            startActivity(cuestionariosAlumno);
                        }

                    } else {
                        //TODO: enque con response tipo Object (Generico)
                        Retrofit retrofit = new Retrofit.Builder()
                                .baseUrl("https://serviciosocial-backend.mybluemix.net/ssfca/api/v1/")
                                .addConverterFactory(GsonConverterFactory.create())
                                .build();

                        jsonApi = retrofit.create(JsonApi.class);

                        Call<ResultResponse> login = jsonApi.loginUser(new Login(correo, password));

                        login.enqueue(new Callback<ResultResponse>() {
                            @Override
                            public void onResponse(Call<ResultResponse> call, Response<ResultResponse> response) {
                                System.out.println(response);
                                System.out.println(response.body());

                                if(!response.isSuccessful()){
                                    System.out.println("Codigo: " + response.code());
                                    return;
                                }

                                //String token = response.body().getMessage();
                                //System.out.println(response.body().getMessage();
                            }

                            @Override
                            public void onFailure(Call<ResultResponse> call, Throwable t) {

                            }
                        });
                    }
                }
            }
        });

        btnRegistrarse.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                startActivity(new Intent(LoginActivity.this, ProfileActivity.class));
            }
        });


        btnOlvidoContraseña.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                startActivity(new Intent(LoginActivity.this, ResetPassword.class));
            }
        });

    }


    public boolean validacionesLogin(String email, String password) {
        if ((email.trim().isEmpty() || email == "") && (password.trim().isEmpty() || password == "")){
            mostrarAlertaSimple("No ha ingresado correo y contraseña", "Por favor, ingrese un correo electrónico y contraseña");
            editTextCorreo.setError("Campo obligatorio");
            editTextPassword.setError("Campo obligatorio");
            return false;
        } else if(email.trim().isEmpty() || email == ""){
            mostrarAlertaSimple("No ha ingresado correo electrónico", "Por favor, ingrese un correo electrónico");
            editTextCorreo.setError("Campo obligatorio");
            return false;
        } else if (!email.matches(emailPattern)){
            mostrarAlertaSimple("Correo Electrónico Erróneo", "Por favor, ingresa una dirección correo electrónico válido");
            editTextCorreo.setError("Ingresa un correo válido");
            return false;
        } else if (password.trim().isEmpty() || password == ""){
            mostrarAlertaSimple("No ha ingresado contraseña", "Por favor, ingrese una contraseña");
            editTextPassword.setError("Campo obligatorio");
            return false;
        }
        return true;
    }

    public void mostrarAlertaSimple(String titulo, String mensaje){
        AlertDialog alertDialog = new AlertDialog.Builder(LoginActivity.this).create();
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

    public void alertaLoginExitoso(String titulo, String mensaje){
        AlertDialog alertDialog = new AlertDialog.Builder(LoginActivity.this).create();
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

    public void alertaLoginError(String titulo, String mensaje){
        AlertDialog alertDialog = new AlertDialog.Builder(LoginActivity.this).create();
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

}