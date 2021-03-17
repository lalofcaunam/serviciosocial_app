package com.lalofcaunam.estudiafca.Modelos;

import com.google.gson.annotations.SerializedName;

public class ResultResponse {

    @SerializedName("message")
    private String message;

    @SerializedName("description")
    private String description;

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
