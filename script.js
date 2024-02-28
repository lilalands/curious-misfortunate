var title = '<h1><a href="/">minaizamina</a></h1>';


let md = window.markdownit({html: true});

var width;

$("document").ready(function(){
    width = $(window).width();
    displayText();
});

$("#handle").draggable({
    grid: [50, 50],
    axis: "x",
    containment: "#container",
    zIndex: 100,
    drag: function(event, ui){
        ui.position.left = Math.min(Math.max( 50, ui.position.left ), width - 100);

        let x = ui.position.left + 12.5;

        $("#left").css( "width", x );
        $("#left")[ 0 ].style.setProperty( '--title-fontsize',  x / window.innerWidth );
        $("#right").css( "width", x );
        $("#right")[ 0 ].style.setProperty( '--title-fontsize',  x / window.innerWidth );
    }
});

function displayText(){
    $("#title").html(title);

    $.ajax({
        url: `md/projects.md`,
        datatype: "html",
        success: function(markdown){
            let html = md.render(markdown);
            $(`#right`).html(html);


            const paragraphs = document.querySelectorAll( '#right p' );
            const random_paragraph = paragraphs[ Math.floor( Math.random( ) * paragraphs.length ) ];

            const sentences = random_paragraph.innerText.match( /[^\.!\?]+[\.!\?]+/g );

            const random_index = Math.floor( Math.random( ) * sentences.length );
            let random_sentence = sentences[ random_index ];
            random_sentence = `<span class="inserted">${ random_sentence }</span>`;


            paragraphs.forEach( paragraph => {

                const amount = 3;
                const add_sentence = ( Math.floor( Math.random( ) * amount ) % amount == 0 );

                if ( add_sentence ) {
                    let sentences = paragraph.innerHTML.match( /[^\.!\?]+[\.!\?]+/g );
            
                    const insert_index = Math.floor( Math.random( ) * sentences.length ); 
                    sentences.splice( insert_index, 0, random_sentence );

// console.log( sentences );

                    paragraph.innerHTML = sentences.join( '' ); 
                   // console.log( paragraph.innerHTML );
                }
            } );
           /* $( '#right a' ).click( function( event ) {
                event.preventDefault( );

                loadProject( $( this ).attr( 'href' ) );
            } ); */
        }
    });

    $.ajax({
        url: `md/notes.md`,
        datatype: "html",
        success: function(markdown){
            let html = md.render(markdown);
            $(`#left`).append(html);
        }
    });

    $.ajax({
        url: `md/titlemain.md`,
        datatype: "html",
        success: function(markdown){
            let html = md.render(markdown);
            $(`#right`).append(html);
        }
    });
}

// Show the button when scrolling down

/* 
const handle = document.getElementById( 'handle' );

handle.addEventListener( 'dragstart', event => {
    handle.classList.add( 'dragging' );  
    //console.log( event.offsetX );
} );
handle.addEventListener( 'drag', event => {
    handle.classList.add( 'dragging' );  

    //console.log( event );
} );
handle.addEventListener( 'dragend', event => {
    handle.style.left = event.screenX + 'px';
} );
// document.addEventListener( 'mousemove', event => {

//     // ABORT MISSION IF SLIDER IS NOT CLICKED
//     if ( handle.classList.contains( 'dragging' ) == false ) return;

//     // CODE ONLY GETS EXECUTED WHEN THE SLIDER IS CLICKED
//     handle.style.left = event.clientX + 'px';
    
// } );
// document.addEventListener( 'mouseup', ( ) => {
//     handle.classList.remove( 'dragging' );  
// } );

console.log( handle )

*/
/*document.getElementById('right').addEventListener("scroll", (event) => {
    console.log(event.target.scrollTop)
    document.getElementById('alper').style.top = event.target.scrollTop + 'px'
}) */