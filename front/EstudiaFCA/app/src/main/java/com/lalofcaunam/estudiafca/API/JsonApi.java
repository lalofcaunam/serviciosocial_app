package com.lalofcaunam.estudiafca.API;

import com.lalofcaunam.estudiafca.Modelos.Alumno;
import com.lalofcaunam.estudiafca.Modelos.Login;
import com.lalofcaunam.estudiafca.Modelos.ResetPass;
import com.lalofcaunam.estudiafca.Modelos.ResultResponse;
import com.lalofcaunam.estudiafca.Modelos.Profesor;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.Field;
import retrofit2.http.FormUrlEncoded;
import retrofit2.http.Headers;
import retrofit2.http.POST;


public interface JsonApi {

    // REGISTRO NUEVO USUARIO
    @Headers({"Content-Type: application/json", "Accept: application/json"})
    @POST("usuarios/signup")
    Call<ResultResponse> registerAlumno(@Body Alumno alumno);

    @Headers({"Content-Type: application/json", "Accept: application/json"})
    @POST("usuarios/signup")
    Call<ResultResponse> registerProfesor(@Body Profesor profesor);

    @Headers({"Content-Type: application/json", "Accept: application/json"})
    @POST("usuarios/login")
    Call<ResultResponse> loginUser(@Body Login login);

    @Headers({"Content-Type: application/json", "Accept: application/json"})
    @POST("usuarios/reset")
    Call<ResultResponse> resetPassword(@Body ResetPass resetPass);

}
