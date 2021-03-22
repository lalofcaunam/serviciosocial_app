package com.lalofcaunam.estudiafca.Alumno;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.lalofcaunam.estudiafca.R;

import java.util.List;

public class PreguntaAdapter extends RecyclerView.Adapter<PreguntaAdapter.preguntaViewHolder> {

    private List<PreguntaItem> preguntaItems;

    public PreguntaAdapter(List<PreguntaItem> preguntaItems) {
        this.preguntaItems = preguntaItems;
    }

    @NonNull
    @Override
    public PreguntaAdapter.preguntaViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        return new PreguntaAdapter.preguntaViewHolder(
                LayoutInflater.from(parent.getContext()).inflate(
                        R.layout.item_container_pregunta, parent, false
                )
        );
    }

    @Override
    public void onBindViewHolder(@NonNull PreguntaAdapter.preguntaViewHolder holder, int position) {
        holder.setPreguntaData(preguntaItems.get(position));
    }

    @Override
    public int getItemCount() {
        return preguntaItems.size();
    }

    class preguntaViewHolder extends RecyclerView.ViewHolder {
        private TextView scorePregunta;
        private TextView textPregunta;

        public preguntaViewHolder(@NonNull View itemView) {
            super(itemView);
            scorePregunta = itemView.findViewById(R.id.scorePregunta);
            textPregunta = itemView.findViewById(R.id.textPregunta);
        }

        void setPreguntaData(PreguntaItem preguntaItem) {
            scorePregunta.setText(preguntaItem.getScore());
            textPregunta.setText(preguntaItem.getTextPregunta());
        }

    }
}
