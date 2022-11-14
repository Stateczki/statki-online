# STANDARD FOR NOW
#1 cztero, 2 trzy, 3 dwa, 4 jeden
board_size = 10
ships_initial_count = {"czteromasztowiec" : 1,
                       "trójmasztowiec" : 2,
                       "dwumasztowiec" : 3,
                       "jednomasztowiec" : 4}
player1_board = [[0 for i in range(board_size)] for j in range(board_size)]
player2_board = [[0 for i in range(board_size)] for j in range(board_size)]


def check_if_hit(player_number, x, y):
    if player_number == 1:
        if player2_board[x][y] == 1:
            return True
    elif player_number == 2 :
        if player1_board[x][y] == 1:
            return True
    return False


def check_who_win():
    #Player1 wins: 1
    #Player2 wins: -1
    #Nobody won: 0
    who_won = 0
    for i in player1_board:
        if i.count(1) > 0:
            who_won = 1
    if who_won == 0:
        return -1
    for i in player2_board:
        if i.count(1) > 0:
            who_won = -1
    if who_won == 1:
        return 1
    return 0


def display_board():
    for i in player1_board:
        print(i)


def place_ships():
    pass


if __name__ == "__main__":
    print("sor")