/*
 * UI Button Class
 */
export default class UiButton extends Phaser.GameObjects.Container {
    constructor(scene, x, y, key, hoverKey, text, targetCallback) {
        super(scene, x, y);

        // Set the scene that the container will get added to.
        this.scene = scene;

        // Set the X & Y Position of the container
        this.x = x;
        this.y = y;

        // Set the background image of our button using the respective key.
        this.key = key;

        // Set the image that will be displayed on hover using respective key.
        this.hoverKey = hoverKey;

        // Set the text that will be displayed
        this.text = text;

        // The callback function that will be called, upon a click event.
        this.targetCallback = targetCallback;

        // Create the button.
        this.createButton();

        // Add the container to the phaser scene
        this.scene.add.existing(this);
    }

    createButton() {
        // Set the button to the relevant button image.
        this.button = this.scene.add.image(0, 0, 'button1');

        // Ensure the button is interactive.
        this.button.setInteractive();

        // Scale the button to suit our needs.
        // this.button.setScale(1.4);

        // Set the button text.
        this.buttonText = this.scene.add.text(0, 0, this.text, { fontSize: '26px', fill: '#fff' });

        // Center the text within the button.
        Phaser.Display.Align.In.Center(this.buttonText, this.button);

        // Add the objects to our game container.
        this.add(this.button);
        this.add(this.buttonText);

        // Listen for any events on the button.
        this.button.on('pointerdown', () => {
            this.targetCallback();
        });
        this.button.on('pointerover', () => {
            this.button.setTexture(this.hoverKey);
        });

        this.button.on('pointerout', () => {
            this.button.setTexture(this.key);
        });
    }
}
