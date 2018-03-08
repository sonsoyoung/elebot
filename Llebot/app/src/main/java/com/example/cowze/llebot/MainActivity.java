package com.example.cowze.llebot;


import android.content.DialogInterface;
import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AlertDialog;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.webkit.JavascriptInterface;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

import org.json.JSONObject;

import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
//import java.net.URISyntaxException;
//
//import io.socket.client.IO;
//import io.socket.client.Socket;
//import io.socket.emitter.Emitter;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.net.Socket;


public class MainActivity extends AppCompatActivity {

    private WebView mWebView;
    private WebSettings mWebSettings;
    private Socket mSocket;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        setContentView(R.layout.activity_main);

        /*Button button = (Button) findViewById(R.id.button);
        button.setOnClickListener(new View.OnClickListener() {
            public void onClick(View v) {
                Intent intent = new Intent(getApplicationContext(),ControlActivity.class);
                startActivity(intent);
            }
        });*/

        mWebView = (WebView)findViewById(R.id.webview);
        mWebSettings = mWebView.getSettings();
        mWebSettings.setJavaScriptEnabled(true);
        mWebView.setWebViewClient(new WebViewClient());
//        mWebView.loadUrl("http://m.nate.com");

//        mWebView.setWebViewClient(new WebViewClient(){
//            public boolean shouldOverrideUrlLoading(WebView view,String url){
//                view.loadUrl(url);
//                return true;
//            }
//        });
        mWebView.loadUrl("file:///android_asset/www/index.html");

        mWebView.addJavascriptInterface(new Object() {
            @JavascriptInterface
            public void justDoIt(String keyword) {

                if(keyword.equals("1")){
                    Intent launchIntent = getPackageManager().getLaunchIntentForPackage("com.kakao.yellowid");
                    startActivity(launchIntent);
                }

                if(keyword.equals("2")){
                    Intent intent = new Intent(getApplicationContext(),AmenityActivity.class);
                    startActivity(intent);
                }

                if(keyword.equals("3")){
                    Intent intent = new Intent(getApplicationContext(),ControlActivity.class);
                    startActivity(intent);
                }
                //Toast.makeText(MainActivity.this, "Keyword is " + keyword, Toast.LENGTH_LONG).show();
            }
        }, "Zeany");

//        try {
//            mSocket = IO.socket("http://ec2-13-125-160-130.ap-northeast-2.compute.amazonaws.com:9001");
//            mSocket.on(Socket.EVENT_CONNECT, onConnect);
//            mSocket.on("01", onMessageReceived01);
//            mSocket.connect();
//        } catch(URISyntaxException e) {
//            e.printStackTrace();
//        }


//        ConnectThread thread = new ConnectThread("ec2-13-125-160-130.ap-northeast-2.compute.amazonaws.com");
//        thread.start();

    }
//    class ConnectThread extends Thread {
//        String hostname;
//
//        public ConnectThread(String addr) {
//            hostname = addr;
//        }
//
//        public void run() {
//
//            try {
//                int port = 9001;
//
//                Socket sock = new Socket(hostname, port);
//                Log.d("MainActivity", "Hellooooooooooooooooooooooooooooooooo");
//                try{
//                    ObjectOutputStream outstream = new ObjectOutputStream(sock.getOutputStream());
//                    outstream.writeObject("Hello AndroidTown on Android");
//                    outstream.flush();
//                }catch(Exception ex) {
//                    ex.printStackTrace();
//                }
//
//
//                Log.d("MainActivity", "22Hellooooooooooooooooooooooooooooooooo");
//
//                ObjectInputStream instream = new ObjectInputStream(sock.getInputStream());
//                String obj = (String) instream.readObject();
//                Log.d("MainActivity", "서버에서 받은 메세지 : ");
//                Log.d("MainActivity", "서버에서 받은 메세지 : " + obj);
//
////                sock.close();
//
//            } catch(Exception ex) {
//                ex.printStackTrace();
//            }
//
//        }
//    }




//
//    // Socket서버에 connect 된 후, 서버로부터 전달받은 'Socket.EVENT_CONNECT' Event 처리.
//    private Emitter.Listener onConnect = new Emitter.Listener() {
//        @Override
//        public void call(Object... args) {
//            Log.d("socket","server connect");// your code...
//        }
//    };
//
//    // 서버로부터 전달받은 'chat-message' Event 처리.
//    private Emitter.Listener onMessageReceived01 = new Emitter.Listener() {
//        @Override
//        public void call(Object... args) {
//            // 전달받은 데이터는 아래와 같이 추출할 수 있습니다.
//            JSONObject receivedData = (JSONObject) args[0];
//            Log.d("socket",receivedData.toString());
//            // your code...
//            //showMessage();
//        }
//    };
//
//    private void showMessage() {
//        AlertDialog.Builder builder = new AlertDialog.Builder(this);
//        builder.setTitle("Message from Server");
//        builder.setMessage("L.lebot drive start");
//        builder.setIcon(android.R.drawable.ic_dialog_alert);
//
//        builder.setPositiveButton("OK", new DialogInterface.OnClickListener() {
//            public void onClick(DialogInterface dialog, int whichButton) {
//
//
//            }
//        });
//
//        builder.setNeutralButton("CANCEL",new DialogInterface.OnClickListener() {
//            public void onClick(DialogInterface dialog, int whichButton) {
//
//            }
//        });
//
//        builder.setNegativeButton("NO", new DialogInterface.OnClickListener() {
//            public void onClick(DialogInterface dialog, int whichButton) {
//
//            }
//        });
//
//        AlertDialog dialog = builder.create();
//        dialog.show();
//    }
}
