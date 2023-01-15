# Sprawdza czy strzał przeciwnika był celny
# Output:
#       0 - pudło
#       1 - trafiony
#       2 - trafiony nie zatopiony
def accurate_shot(table, hit_point):
    if int(hit_point) in table:
        # if more_to_hit(table, hit_point):
        #     return 2
        return 1
    else:
        return 0


# Sprawdza czy strzał
def more_to_hit(table, hit_point):
    if (int(hit_point) + 1 in table and int(hit_point) // 11 == (int(hit_point) + 1) // 11) or \
            (int(hit_point) - 1 in table and int(hit_point) // 11 == (int(hit_point) - 1) // 11):
        return True
    if int(int(hit_point) + 11) in table or int(int(hit_point) - 11) in table:
        return True

    return False
