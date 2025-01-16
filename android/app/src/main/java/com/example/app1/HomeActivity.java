
// HomeActivity.java
package com.example.app1;

import android.app.Activity;
import android.os.Bundle;
import android.view.View;
import android.widget.GridLayout;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.LinearLayout;
import android.graphics.Color;
import android.view.Gravity;

public class HomeActivity extends Activity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // Set up the root layout
        LinearLayout rootLayout = new LinearLayout(this);
        rootLayout.setOrientation(LinearLayout.VERTICAL);
        rootLayout.setBackgroundColor(Color.parseColor("#121212"));

        // App Title
        TextView appTitle = new TextView(this);
        appTitle.setText("Welcome to MitkademFlix");
        appTitle.setTextSize(24);
        appTitle.setTextColor(Color.WHITE);
        appTitle.setTextAlignment(View.TEXT_ALIGNMENT_CENTER);
        appTitle.setPadding(0, 50, 0, 50);
        rootLayout.addView(appTitle);

        // Grid Layout for movies
        GridLayout movieGrid = new GridLayout(this);
        movieGrid.setColumnCount(3);
        movieGrid.setRowCount(3);
        movieGrid.setPadding(20, 20, 20, 20);
        movieGrid.setPivotY(Gravity.CENTER);

        // Example movies
        for (int i = 1; i <= 9; i++) {
            LinearLayout movieLayout = new LinearLayout(this);
            movieLayout.setOrientation(LinearLayout.VERTICAL);
            movieLayout.setPadding(10, 10, 10, 10);

            ImageView moviePoster = new ImageView(this);
            moviePoster.setImageResource(android.R.drawable.ic_media_play); // Placeholder image
            moviePoster.setBackgroundColor(Color.parseColor("#444444"));
            moviePoster.setPadding(5, 5, 5, 5);
            movieLayout.addView(moviePoster);

            TextView movieTitle = new TextView(this);
            movieTitle.setText("Movie " + i);
            movieTitle.setTextColor(Color.WHITE);
            movieTitle.setTextSize(16);
            movieTitle.setTextAlignment(View.TEXT_ALIGNMENT_CENTER);
            movieLayout.addView(movieTitle);

            movieGrid.addView(movieLayout);
        }

        rootLayout.addView(movieGrid);
        setContentView(rootLayout);
    }
}